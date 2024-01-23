import {Icon} from '@rneui/themed'
import {StyleSheet} from 'react-native'

import USDT from 'images/icons/USDT.svg'
import USDC from 'images/icons/USDC.svg'
import type {PlatformType} from 'hooks/helper/usePlatform'
import {selectCurrencies, AllCurrencyType} from 'constants/currency.config'

const SIZE = 30

const styles = StyleSheet.create({
  USD: {
    height: SIZE,
    width: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZE / 2,
    marginRight: 10,
    backgroundColor: '#6EE30E',
  },
  EUR: {
    height: SIZE,
    width: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZE / 2,
    marginRight: 10,
    backgroundColor: '#3793FF',
  },
  Common: {
    height: SIZE,
    width: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZE / 2,
    marginRight: 10,
  },
})

export const currencyConfig: {
  [key in AllCurrencyType]: {
    id: AllCurrencyType
    label: string
    icon: JSX.Element
  }
} = {
  USD: {
    id: 'USD',
    label: 'USD',
    icon: (
      <Icon name='dollar' type='font-awesome' size={SIZE / 2} color='white' style={styles.USD} />
    ),
  },
  EUR: {
    id: 'EUR',
    label: 'EUR',
    icon: <Icon name='euro' size={SIZE / 2} color='white' style={styles.EUR} />,
  },
  // Inactive Crypto Payment
  /*USDT: {
    id: 'USDT',
    label: 'USDT',
    icon: <USDT height={30} width={30} style={styles.Common} />,
  },
  USDC: {
    id: 'USDC',
    label: 'USDC',
    icon: <USDC height={30} width={30} style={styles.Common} />,
  },*/
}

export const getCurrencyConfig = (platform: PlatformType) =>
  selectCurrencies[platform].map(item => currencyConfig[item])
