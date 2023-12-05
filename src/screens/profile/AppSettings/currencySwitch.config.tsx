import {StyleSheet} from 'react-native'
import {Icon} from '@rneui/themed'

import type {PlatformType} from 'hooks/helper/usePlatform'
import {regionalCurrencies, FiatCurrencyTypes} from 'constants/currency.config'

const SIZE = 45

const styles = StyleSheet.create({
  USD: {
    height: SIZE,
    width: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZE / 2,
    marginRight: 10,
    backgroundColor: '#3e9c35',
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
})

export const currencyConfig: {
  [key in FiatCurrencyTypes]: {
    id: FiatCurrencyTypes
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
}

export const getCurrencyConfig = (platform: PlatformType) =>
  regionalCurrencies[platform].map(item => currencyConfig[item])
