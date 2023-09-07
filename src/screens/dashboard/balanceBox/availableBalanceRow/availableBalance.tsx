import {useMemo} from 'react'
import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

import Loader from '@core/Loader'

import {Data} from 'hooks/crypto/useBalance'

export type AvailableBalanceRowProps = {
  asset?: string
  logo?: JSX.Element
  data?: Data
  isLoading?: boolean
  assetsPrice?: number
}

export type LoaderBoxProps = {
  isLoading?: boolean
  price: number | undefined | null
}

const LoaderBox = ({isLoading, price}: LoaderBoxProps) => {
  if (isLoading) {
    return <Loader />
  }
  return <Text>{price ?? '-'}</Text>
}

const AvailableBalanceRow = ({
  asset,
  logo,
  data,
  isLoading,
  assetsPrice,
}: AvailableBalanceRowProps) => {
  const styles = useStyles()
  const {isConnected} = useWalletConnectModal()

  //BNB two digit
  // BWG four digit
  const balance = useMemo(() => {
    if (data) return Number(data?.value.toFixed(3))
    return null
  }, [data])

  const totalPrice = useMemo(() => {
    if (balance && assetsPrice) return Number((balance * assetsPrice).toFixed(3))
    return null
  }, [balance, assetsPrice])

  return (
    <View style={styles.assetGrid}>
      <View style={styles.iconBox}>
        {logo}
        <Text h4 h4Style={{fontSize: 15, fontWeight: '700'}}>
          {asset}
        </Text>
      </View>
      <View style={styles.gridItem}>
        <LoaderBox isLoading={isLoading} price={isConnected ? assetsPrice : null} />
      </View>
      <View style={styles.gridItem}>
        <LoaderBox isLoading={isLoading} price={balance} />
      </View>
      <View style={styles.gridItem}>
        <LoaderBox isLoading={isLoading} price={totalPrice} />
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
