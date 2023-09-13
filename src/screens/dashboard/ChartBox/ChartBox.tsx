import {Dimensions, View} from 'react-native'
import {useQuery} from '@tanstack/react-query'
import {LineChart} from 'react-native-chart-kit'
import {Text} from '@rneui/base'

import {AssetChartItem} from 'api/Response'
import {cacheKey} from 'api/CacheKey'
import {useAuthToken, useApi} from 'hooks/api'
import Logo from 'components/Logo'

const ChartBox = () => {
  const api = useApi()
  const {token} = useAuthToken()
  const {data} = useQuery<AssetChartItem[]>({
    queryKey: [cacheKey.dashboard_chart],
    queryFn: () => api.getChartSymbol({symbol: 'BWG', days: 30, currency: 'USD'}),
    enabled: !!token,
    initialData: [
      {
        price: '0',
        timestamp: 1657202045,
      },
    ],
  })

  const formatDate = (date: Date) => {
    const day = date.getDate()
    const month = date.toLocaleString('default', {month: 'short'})
    return `${day} ${month}`
  }

  const reduceChart = (data: AssetChartItem[], intervalDays: number) => {
    let prevItemTS: number | undefined
    return data.reduce((acc: AssetChartItem[], item: AssetChartItem): AssetChartItem[] => {
      const itemTS = item.timestamp * 1000
      const daysDiff = prevItemTS ? (itemTS - prevItemTS) / (1000 * 60 * 60 * 24) : undefined

      if (daysDiff === undefined || Math.round(daysDiff) >= intervalDays) {
        acc.push(item)
        prevItemTS = itemTS
      }

      return acc
    }, [])
  }

  const chartData = reduceChart(data, 2)
  const labels = chartData.map(value => formatDate(new Date(value.timestamp * 1000)))
  const chartPrice = chartData.map(value => Number(value.price))

  return (
    <>
      <View style={{alignItems: 'center', flexDirection: 'row', gap: 5}}>
        <Logo width={35} height={35} />
        <Text h4>
          Bretton Woods{' '}
          <Text h4 h4Style={{fontStyle: 'italic'}}>
            digital{' '}
          </Text>
          Gold
        </Text>
      </View>

      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: chartPrice,
            },
          ],
        }}
        width={Dimensions.get('window').width - 16} // from react-native
        height={250}
        yAxisLabel={'$'}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#f2f2f2',
          backgroundGradientTo: '#f5f5f5',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 5,
        }}
      />
    </>
  )
}

export default ChartBox
