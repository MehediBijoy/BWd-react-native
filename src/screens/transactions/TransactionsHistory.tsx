import React from 'react'
import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'
import {useQuery} from '@tanstack/react-query'

import {useApi} from 'hooks/api'
import {OrderHistory} from 'api/Response'
import {cacheKey} from 'api/CacheKey'

const TransactionsHistory = () => {
  const api = useApi()
  const styles = useStyles()
  const limit = 10
  const page = 1

  const {data} = useQuery<OrderHistory>({
    queryKey: [cacheKey.orderHistory, limit, page],
    queryFn: () => api.getOrders({limit, page}),
  })

  console.log(data?.data[0].paid_amount)
  console.log(data?.data[0].received_amount)

  return (
    <View style={styles.assetGrid}>
      <Text style={styles.gridHeader}>Date</Text>
      <Text style={styles.gridHeader}>Description</Text>
      <Text style={styles.gridHeader}>Status</Text>
    </View>
  )
}

export default TransactionsHistory

const useStyles = makeStyles(({colors}) => ({
  iconColor: {
    color: colors.textPrimary,
  },
  assetGrid: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
  },

  gridHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
  },
  iconBox: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
}))
