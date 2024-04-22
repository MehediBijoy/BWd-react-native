import {useMemo} from 'react'
import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

import Loader from '@core/Loader'

import {formatCurrency} from 'utils'
import {useAssetsPrice} from 'hooks/helper'
import {useCurrency, useLocales} from 'hooks/states'
import {DataProps} from 'hooks/crypto/useBalance'

export type AvailableBalanceRowProps = {
  asset: 'BWG' | 'BUSD' | 'BNB'
  title: string
  logo?: JSX.Element
  data?: DataProps
  isLoading?: boolean
}

export type LoaderBoxProps = {
  isLoading?: boolean
  price?: number | string
}

const LoaderBox = ({isLoading, price}: LoaderBoxProps) => {
  if (isLoading) {
    return <Loader />
  }
  return <Text>{price ?? '-'}</Text>
}

const AvailableBalanceRow = ({asset, title, logo, data, isLoading}: AvailableBalanceRowProps) => {
  const styles = useStyles()
  const {currency} = useCurrency()
  const {currentLang} = useLocales()

  const {data: price} = useAssetsPrice(asset)

  //BNB two digit
  // BWG four digit
  const balance = useMemo(() => data && Number(data?.value.toFixed(4)), [data])

  const totalPrice = useMemo(
    () => balance && price && Number((balance * Number(price)).toFixed(4)),
    [balance, price]
  )

  return (
    <View style={styles.assetGrid}>
      <View style={styles.iconBox}>
        {logo}
        <Text h4 h4Style={{fontSize: 14, fontWeight: '700'}}>
          {title}
        </Text>
      </View>
      <View style={styles.gridItem}>
        <LoaderBox
          isLoading={isLoading}
          price={
            price
              ? formatCurrency(price, {
                  currency,
                  locales: currentLang,
                })
              : undefined
          }
        />
      </View>
      <View style={styles.gridItem}>
        <LoaderBox isLoading={isLoading} price={balance} />
      </View>
      <View style={styles.gridItem}>
        <LoaderBox
          isLoading={isLoading}
          price={
            totalPrice ? formatCurrency(totalPrice, {currency, locales: currentLang}) : undefined
          }
        />
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
    gap: 5,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  iconBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: 120,
  },
}))
