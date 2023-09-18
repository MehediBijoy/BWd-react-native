import React from 'react'
import {ActivityIndicator, TouchableOpacity, View} from 'react-native'
import {Badge, Text, makeStyles} from '@rneui/themed'
import {useQuery} from '@tanstack/react-query'

import {useApi} from 'hooks/api'
import {OrderHistory, Payment, Transfer} from 'api/Response'
import {cacheKey} from 'api/CacheKey'
import {formatDate} from 'utils'

import OrderDetailsModal from './OrderDetailsModal'

const TransactionsHistory = () => {
  const api = useApi()
  const styles = useStyles()
  const [selectedRow, setSelectedRow] = React.useState<Payment<Transfer> | undefined>()

  const {data, isLoading} = useQuery<OrderHistory>({
    queryKey: [cacheKey.orderHistory],
    queryFn: () => api.getOrders({}),
  })

  console.log(isLoading)

  return (
    <>
      <View style={[styles.container, styles.tableBorder]}>
        <View style={[styles.headerRow]}>
          <Text style={styles.cellDetails}>Description</Text>
          <Text style={{width: '25%', textAlign: 'left'}}>Status</Text>
          <Text style={[styles.cellDate]}>Date</Text>
        </View>
        {data?.data.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={styles.row}
            onPress={() => setSelectedRow(item)}
          >
            <View style={styles.cellDetails}>
              <Text style={styles.titleText}>#Order: {item.id}</Text>
              <Text>
                <Text style={styles.labelText}>Paid Amount:</Text> {item.paid_amount}{' '}
              </Text>
              <Text style={styles.subText}>
                <Text style={styles.labelText}>Received Amount:</Text> {item.received_amount}{' '}
              </Text>
              <Text style={styles.subText}>
                <Text style={styles.labelText}>Payment Method:</Text> {item.payment_type}{' '}
              </Text>
            </View>
            <View style={{width: '25%', alignItems: 'flex-start'}}>
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
                    item.transfer ? item.transfer.status.toUpperCase() : item.status.toUpperCase()
                  }
                />
              }
            </View>
            <Text style={styles.cellDate}>{formatDate(new Date(item.created_at))}</Text>
          </TouchableOpacity>
        ))}

        {isLoading && (
          <ActivityIndicator style={{marginVertical: 20}} size='large' color='#00ff00' />
        )}
      </View>

      {selectedRow && (
        <OrderDetailsModal
          isOpened
          selectedRow={selectedRow}
          onClose={() => setSelectedRow(undefined)}
        />
      )}
    </>
  )
}

export default TransactionsHistory

const useStyles = makeStyles(({colors}) => ({
  container: {
    backgroundColor: colors.white,
    marginTop: 10,
  },
  tableBorder: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
  },
  headerRow: {
    padding: 5,
    backgroundColor: '#e0e0e0',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  row: {
    padding: 5,
    height: 90,
    minHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  cellDate: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '100',
    width: '20%',
  },
  cellDetails: {
    paddingLeft: 5,
    textAlign: 'left',
    width: '55%',
  },
  cellStatus: {
    textAlign: 'center',
    width: '25%',
  },
  subText: {
    fontSize: 11,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.tertiary,
  },
  labelText: {
    // color: colors.tertiary,
    fontSize: 12,
    fontWeight: '700',
  },
}))
