import React from 'react'
import {useTranslation} from 'react-i18next'
import {makeStyles} from '@rneui/themed'
import {useQuery, useQueryClient} from '@tanstack/react-query'

import {Table} from '@core/Table'

import {useApi} from 'hooks/api'
import {OrderHistory} from 'api/Response'
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
  const [selectedId, setSelectedId] = React.useState<number>()

  const {data: orderHistory, isLoading} = useQuery<OrderHistory>({
    queryKey: [cacheKey.orderHistory],
    queryFn: () => api.getOrders().then(result => formatOrders(result, currentLang, t)),
  })

  const selectedRow = React.useMemo(
    () => orderHistory?.payments?.find(item => item.id === selectedId),
    [selectedId, orderHistory]
  )

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
          return {payments: data, meta: orders?.meta}
        })
      },
    })

    subscribe('TransfersChannel', {
      received({data: socketData}) {
        queryClient.setQueryData<Partial<OrderHistory>>([cacheKey.orderHistory], orders => {
          const data = orders?.payments?.map(item =>
            item.id === socketData?.payment_id ? {...item, transfer: socketData} : item
          )
          return {payments: data, meta: orders?.meta}
        })
      },
    })
  }, [queryClient, subscribe])

  const config = [
    {
      header: 'common.table-header-description',
      fields: ['orderId', 'paidAmount', 'receivedAmount', 'payment_type'],
      localKeys: [
        'trade.table.headers.order',
        'trade.table.headers.paidAmount',
        'trade.table.headers.receivedAmount',
        'dashboard.buy.confirm.method',
      ],
      types: ['keypair', 'keypair', 'keypair', 'keypair'],
      cellStyle: styles.cellDetails,
      textStyle: [styles.titleText, {}, {}, {}],
    },
    {
      header: 'trade.table.status',
      fields: ['stage', 'orderStatus'],
      localKeys: ['', 'trade.orderStatuses.##orderStatus##'],
      types: ['text', 'badge'],
      cellStyle: styles.cellStatus,
      textStyle: [{marginBottom: 5}, {}],
    },
    {
      header: 'trade.table.headers.date',
      fields: ['createdTime', 'createdDate'],
      types: ['text', 'text'],
      cellStyle: styles.cellDate,
    },
  ]

  return (
    <>
      {selectedRow && (
        <OrderDetailsModal isOpened data={selectedRow} onClose={() => setSelectedId(undefined)} />
      )}
      {
        <Table
          containerStyle={styles.container}
          config={config}
          data={orderHistory?.payments}
          isLoading={isLoading}
          onPress={param => setSelectedId(param)}
        />
      }
    </>
  )
}

export default TransactionsHistory

const useStyles = makeStyles(({colors}) => ({
  container: {
    backgroundColor: colors.background,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
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
    fontSize: 11,
  },
  cellDetails: {
    alignItems: 'flex-start',
    width: '53%',
    fontSize: 11,
  },
  cellStatus: {
    alignItems: 'center',
    width: '25%',
    fontSize: 11,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
  },
  labelText: {
    fontWeight: '700',
  },
}))
