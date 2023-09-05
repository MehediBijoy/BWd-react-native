import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'

import LoadingComponent from '@core/LoadingComponent'

export type AvailableBalanceRowProps = {
  asset?: string
  logo?: JSX.Element
  data?: object
  isLoading?: boolean
  assetsPrice?: object
}

export type LoaderBoxProps = {
  isLoading?: boolean
  data?: number
}

const LoaderBox = ({isLoading, data}: LoaderBoxProps) => {
  if (isLoading) {
    return <LoadingComponent />
  }
  return <Text>{data}</Text>
}

const AvailableBalanceRow = ({
  asset,
  logo,
  data,
  isLoading,
  assetsPrice,
}: AvailableBalanceRowProps) => {
  const styles = useStyles()

  return (
    <View style={styles.assetGrid}>
      <View style={styles.iconBox}>
        {logo}
        <Text h4 h4Style={{fontSize: 15, fontWeight: '700'}}>
          {asset}
        </Text>
      </View>
      <View style={styles.gridItem}>
        <LoaderBox isLoading={isLoading} data={62.38} />
      </View>
      <View style={styles.gridItem}>
        <LoaderBox isLoading={isLoading} data={64.38} />
      </View>
      <View style={styles.gridItem}>
        <LoaderBox isLoading={isLoading} data={73.38} />
      </View>
    </View>
  )
}

export default AvailableBalanceRow

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
    textAlign: 'center',
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
