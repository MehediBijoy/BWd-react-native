import React from 'react'
import {ActivityIndicator, TouchableOpacity, View} from 'react-native'
import {Badge, Text, makeStyles, useTheme} from '@rneui/themed'
import {useQuery, useQueryClient} from '@tanstack/react-query'

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

  const selectedRow = React.useMemo(() => {
    return orderHistory?.data?.find(item => item.id === selectedId)
  }, [selectedId, orderHistory])

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
            item.id === socketData.payment_id ? {...item, transfer: socketData} : item
          )
          return {data, meta: orders?.meta}
        })
      },
    })
  }, [queryClient])

  return (
    <>
      <View style={[styles.container, styles.tableBorder]}>
        <View style={[styles.headerRow]}>
          <Text style={styles.cellDetails}>Description</Text>
          <Text style={styles.cellStatus}>Status</Text>
          <Text style={[styles.cellDate]}>Date</Text>
        </View>
        {orderHistory?.data.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={index === orderHistory?.data.length - 1 ? styles.rowWithRadius : styles.row}
            onPress={() => setSelectedId(item.id)}
          >
            <View style={styles.cellDetails}>
              <Text style={styles.titleText}>#Order: {item.id}</Text>
              <Text style={styles.subText}>
                <Text style={styles.labelText}>Paid Amount:</Text> {item.paid_amount}{' '}
              </Text>
              <Text style={styles.subText}>
                <Text style={styles.labelText}>Received Amount:</Text> {item.received_amount}{' '}
              </Text>
              <Text style={styles.subText}>
                <Text style={styles.labelText}>Payment Method:</Text> {item.payment_type}{' '}
              </Text>
            </View>
            <View style={styles.cellStatus}>
              <Text style={{fontSize: 12}}>{item.transfer ? 'Transfer' : 'Payment'}</Text>
              {
                <Badge
                  containerStyle={{paddingTop: 5}}
                  status={
                    item.transfer?.status == 'completed'
                      ? 'success'
                      : item.transfer?.status == 'rejected'
                      ? 'error'
                      : 'warning'
                  }
                  badgeStyle={{height: 22, borderRadius: 5}}
                  value={
                    item.transfer ? item.transfer.status?.toUpperCase() : item.status?.toUpperCase()
                  }
                />
              }
            </View>
            <Text style={styles.cellDate}>{formatDate(new Date(item.created_at))}</Text>
          </TouchableOpacity>
        ))}

        {isLoading && (
          <ActivityIndicator
            style={{marginVertical: 20}}
            size='large'
            color={theme.colors.primary}
          />
        )}
      </View>

      {selectedRow && (
        <OrderDetailsModal
          isOpened
          selectedRow={selectedRow}
          onClose={() => setSelectedId(undefined)}
        />
      )}
    </>
  )
}

export default TransactionsHistory

const useStyles = makeStyles(({colors}) => ({
  container: {
    backgroundColor: colors.background,
    marginVertical: 10,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  headerRow: {
    padding: 5,
    backgroundColor: colors.bgPaper,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.divider,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  row: {
    padding: 5,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderColor: colors.divider,
  },
  rowWithRadius: {
    padding: 5,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  cellDate: {
    textAlign: 'center',
    fontSize: 12,
    width: '20%',
    color: colors.textPrimary,
  },
  cellDetails: {
    paddingLeft: 5,
    textAlign: 'left',
    width: '55%',
    color: colors.textPrimary,
  },
  cellStatus: {
    textAlign: 'left',
    alignItems: 'flex-start',
    width: '25%',
    fontSize: 12,
    color: colors.textPrimary,
  },
  subText: {
    fontSize: 11,
    color: colors.textPrimary,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.tertiary,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
}))
