import React from 'react'
import {ActivityIndicator, TouchableOpacity, View} from 'react-native'
import {Text, makeStyles, useTheme} from '@rneui/themed'
import {useQuery, useQueryClient} from '@tanstack/react-query'

import StatusBadge from '@core/StatusBadge'

import {useApi} from 'hooks/api'
import {OrderHistory} from 'api/Response'
import {cacheKey} from 'api/CacheKey'
import {formatDate} from 'utils'
import {useSocket} from 'hooks/helper'

import OrderDetailsModal from './OrderDetailsModal'

const TransactionsHistory = () => {
  const api = useApi()
  const {theme} = useTheme()
  const styles = useStyles()
  const {subscribe} = useSocket()
  const queryClient = useQueryClient()
  const [selectedId, setSelectedId] = React.useState<number>()

  const {data: orderHistory, isLoading} = useQuery<OrderHistory>({
    queryKey: [cacheKey.orderHistory],
    queryFn: api.getOrders,
  })

  const selectedRow = React.useMemo(
    () => orderHistory?.data?.find(item => item.id === selectedId),
    [selectedId, orderHistory]
  )

  React.useEffect(() => {
    subscribe('PaymentsChannel', {
      received({data: socketData}) {
        queryClient.setQueryData<Partial<OrderHistory>>([cacheKey.orderHistory], orders => {
          const hasOrder = orders?.data?.find(item => item.id === socketData.id)
          if (!hasOrder) {
            orders?.data?.unshift(socketData)
          } else {
            Object.assign(hasOrder, socketData)
          }
          const data = orders?.data?.map(item => (item.id === socketData.id ? socketData : item))
          return {data: data, meta: orders?.meta}
        })
      },
    })

    subscribe('TransfersChannel', {
      received({data: socketData}) {
        queryClient.setQueryData<Partial<OrderHistory>>([cacheKey.orderHistory], orders => {
          const data = orders?.data?.map(item =>
            item.id === socketData?.payment_id ? {...item, transfer: socketData} : item
          )
          return {data, meta: orders?.meta}
        })
      },
    })
  }, [queryClient, subscribe])

  return (
    <>
      <View style={[styles.container]}>
        <View style={[styles.tableRow, styles.headerRow]}>
          <Text style={styles.cellDetails}>Description</Text>
          <Text style={styles.cellStatus}>Status</Text>
          <Text style={[styles.cellDate, styles.rowText]}>Date</Text>
        </View>

        {isLoading && (
          <ActivityIndicator
            style={{marginVertical: 20}}
            size='large'
            color={theme.colors.primary}
          />
        )}
        {!isLoading &&
          orderHistory &&
          orderHistory.data &&
          orderHistory.data.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              style={[
                styles.tableRow,
                index === orderHistory.data.length - 1 ? styles.bottomRow : styles.bodyRow,
              ]}
              onPress={() => setSelectedId(item.id)}
            >
              <View style={styles.cellDetails}>
                <Text style={[styles.rowText, styles.titleText]}>#Order: {item.id}</Text>
                <Text style={styles.rowText}>
                  <Text style={styles.labelText}>Paid Amount: </Text>
                  {item.paid_amount}
                </Text>
                <Text style={styles.rowText}>
                  <Text style={styles.labelText}>Received Amount:</Text> {item.received_amount}
                </Text>
                <Text style={styles.rowText}>
                  <Text style={styles.labelText}>Payment Method:</Text> {item.payment_type}
                </Text>
              </View>
              <View style={styles.cellStatus}>
                <Text style={[styles.rowText, {marginBottom: 5}]}>
                  {item.transfer?.status ? 'Transfer' : 'Payment'}
                </Text>
                <StatusBadge status={item.transfer?.status ?? item.status} />
              </View>
              <View style={styles.cellDate}>
                <Text style={styles.rowText}>{formatDate(item.created_at, 'hh:mm A')}</Text>
                <Text style={styles.rowText}>{formatDate(item.created_at, 'MMM DD,YYYY')}</Text>
              </View>
            </TouchableOpacity>
          ))}
        {orderHistory && orderHistory.data.length === 0 && (
          <View style={[styles.tableRow, styles.emptyRow]}>
            <Text>No data found</Text>
          </View>
        )}
      </View>

      {selectedRow && (
        <OrderDetailsModal isOpened data={selectedRow} onClose={() => setSelectedId(undefined)} />
      )}
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
    backgroundColor: colors.bgPaper,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  emptyRow: {
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  bodyRow: {
    height: 90,
    borderBottomWidth: 1,
    borderColor: colors.divider,
  },
  bottomRow: {
    height: 90,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  rowText: {
    fontSize: 11,
    color: colors.textPrimary,
  },
  cellDate: {
    alignItems: 'flex-end',
    textAlign: 'right',
    width: '22%',
  },
  cellDetails: {
    textAlign: 'left',
    width: '53%',
  },
  cellStatus: {
    textAlign: 'center',
    alignItems: 'center',
    width: '25%',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
  },
  labelText: {
    fontWeight: '700',
  },
}))
