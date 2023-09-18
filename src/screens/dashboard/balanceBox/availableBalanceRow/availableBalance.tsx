import {useMemo} from 'react'
import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

import Loader from '@core/Loader'

import {useAssets} from 'hooks/helper'
import {DataProps} from 'hooks/crypto/useBalance'

export type AvailableBalanceRowProps = {
  asset: 'BWG' | 'BUSD' | 'BNB'
  logo?: JSX.Element
  data?: DataProps
  isLoading?: boolean
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

const AvailableBalanceRow = ({asset, logo, data, isLoading}: AvailableBalanceRowProps) => {
  const styles = useStyles()
  const {isConnected} = useWalletConnectModal()

  const {data: assetData} = useAssets(asset)

  //BNB two digit
  // BWG four digit
  const balance = useMemo(() => {
    if (data) return Number(data?.value.toFixed(4))
    return null
  }, [data])

  const totalPrice = useMemo(() => {
    if (balance && assetData) return Number((balance * Number(assetData.price)).toFixed(4))
    return null
  }, [balance, assetData])

  return (
    <View style={styles.assetGrid}>
      <View style={styles.iconBox}>
        {logo}
        <Text h4 h4Style={{fontSize: 15, fontWeight: '700'}}>
          {asset}
        </Text>
      </View>
      <View style={styles.gridItem}>
        <LoaderBox isLoading={isLoading} price={isConnected ? Number(assetData?.price) : null} />
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
