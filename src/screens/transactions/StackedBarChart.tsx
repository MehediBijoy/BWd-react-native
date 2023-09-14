import React from 'react'
import {Dimensions} from 'react-native'
import {StackedBarChart} from 'react-native-chart-kit'
import {useQuery} from '@tanstack/react-query'

import {useAuthToken, useApi} from 'hooks/api'
import {cacheKey} from 'api/CacheKey'
import {TransactionChart} from 'api/Response'
import {getMonth} from 'utils'

const TransactionBarChart = () => {
  const api = useApi()
  const {token} = useAuthToken()

  const {data} = useQuery<TransactionChart[]>({
    queryKey: [cacheKey.transactionChart],
    queryFn: () => api.getTransferChart({period_type: 'month', period_numbers: 3}),
    enabled: !!token,
    initialData: [],
  })

  const chartData = data.map(value => value.data.map(data => Number(data.amount)))
  const labels = data.map(value => getMonth(value.month))
  const maxAttribute = Math.max(...data.map(value => Number(value.data.length)))

  const generateColorCodes = (n: number): string[] => {
    const colorCodes: string[] = ['#dfe4ea', '#ced6e0', '#a4b0be', '#efefef']
    return Array.from({length: n}, (_, index) => colorCodes[index % colorCodes.length])
  }

  return (
    <StackedBarChart
      data={{
        labels: labels,
        legend: labels,
        data: chartData,
        barColors: generateColorCodes(maxAttribute),
      }}
      width={Dimensions.get('window').width - 16}
      height={250}
      hideLegend={true}
      chartConfig={{
        backgroundColor: '#1cc910',
        backgroundGradientFrom: '#f2f2f2',
        backgroundGradientTo: '#f5f5f5',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      style={{
        marginVertical: 8,
        borderRadius: 5,
      }}
    />
  )
}

export default TransactionBarChart
