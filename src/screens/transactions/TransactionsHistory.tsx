import React from 'react'
import {useTranslation} from 'react-i18next'
import {makeStyles} from '@rneui/themed'
import {useQuery, useQueryClient} from '@tanstack/react-query'

import {Table} from '@core/Table'

import {useApi} from 'hooks/api'
import {OrderHistory, Payment, Transfer} from 'api/Response'
import {cacheKey} from 'api/CacheKey'
import {useSocket} from 'hooks/helper'
import {useLocales} from 'hooks/states'
import {formatOrders} from 'utils/response'

import OrderDetailsModal from './OrderDetailsModal'

const TransactionsHistory = () => {
  const api = useApi()
  const {t} = useTranslation()
  const styles = useStyles()
  const {subscribe} = useSocket()
  const {currentLang} = useLocales()
  const queryClient = useQueryClient()

  const [selectedItem, setSelectedItem] = React.useState<Payment<Transfer>>()

  const {data: orderHistory, isLoading} = useQuery<OrderHistory>({
    queryKey: [cacheKey.orderHistory],
    queryFn: () => api.getOrders().then(result => formatOrders(result, currentLang, t)),
  })

  React.useEffect(() => {
    subscribe('PaymentsChannel', {
      received({data: socketData}) {
        queryClient.setQueryData<Partial<OrderHistory>>([cacheKey.orderHistory], orders => {
          const hasOrder = orders?.payments?.find(item => item.id === socketData.id)
          if (!hasOrder) {
            orders?.payments?.unshift(socketData)
          } else {
            Object.assign(hasOrder, socketData)
          }
          const data = orders?.payments?.map(item =>
            item.id === socketData.id ? socketData : item
          )
          if (data && orders?.meta) {
            return formatOrders({payments: data, meta: orders?.meta}, currentLang, t)
          }
          return orders
        })
      },
    })

    subscribe('TransfersChannel', {
      received({data: socketData}) {
        queryClient.setQueryData<Partial<OrderHistory>>([cacheKey.orderHistory], orders => {
          const data = orders?.payments?.map(item =>
            item.id === socketData?.payment_id ? {...item, transfer: socketData} : item
          )
          if (data && orders?.meta) {
            return formatOrders({payments: data, meta: orders?.meta}, currentLang, t)
          }
          return orders
        })
      },
    })
  }, [queryClient, subscribe])

  const config = [
    {
      fields: ['orderId', 'paidAmount', 'receivedAmount', 'payment_type'],
      types: ['keypair', 'keypair', 'keypair', 'keypair'],
      cellStyle: styles.cellDetails,
    },
    {
      fields: ['stage', 'orderStatus'],
      types: ['text', 'badge'],
      cellStyle: styles.cellStatus,
      textStyle: [styles.statusTitle],
    },
    {
      fields: ['createdTime', 'createdDate'],
      cellStyle: styles.cellDate,
    },
  ]

  return (
    <>
      {selectedItem && (
        <OrderDetailsModal
          isOpened
          data={selectedItem}
          onClose={() => setSelectedItem(undefined)}
        />
      )}
      {
        <Table
          config={config}
          data={orderHistory?.payments}
          isLoading={isLoading}
          localKeyPrefix={'trade.table'}
          onPress={param => setSelectedItem(param)}
        />
      }
    </>
  )
}

export default TransactionsHistory

const useStyles = makeStyles(({colors}) => ({
  tableRow: {
    padding: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  headerRow: {
    backgroundColor: colors.grey4,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  emptyRow: {
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  bodyRow: {
    height: 'auto',
    borderBottomWidth: 1,
    borderColor: colors.divider,
  },
  bottomRow: {
    height: 'auto',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  cellDate: {
    alignItems: 'flex-end',
    width: '22%',
  },
  cellDetails: {
    alignItems: 'flex-start',
    width: '53%',
  },
  cellStatus: {
    alignItems: 'center',
    width: '25%',
  },
  statusTitle: {
    fontSize: 11,
    marginBottom: 5,
  },
  titleText: {
    fontSize: 11,
  },
}))
