import type {PlatformType} from 'hooks/helper/usePlatform'

export const availableFiatCurrency = ['USD', 'EUR'] as const
export const availableCryptoCurrency = ['USDT', 'USDC'] as const
export type FiatCurrencyTypes = (typeof availableFiatCurrency)[number]
export type CryptoCurrencyTypes = (typeof availableCryptoCurrency)[number]
export type AllCurrencyType = FiatCurrencyTypes | CryptoCurrencyTypes
export const fiatCurrencySymbol: {[key in AllCurrencyType]: string} = {
  USD: '$',
  EUR: '€',
  USDC: 'USDC',
  USDT: 'USDT',
}

export const regionalCurrencies: {[key in PlatformType]: FiatCurrencyTypes[]} = {
  US: ['USD'],
  EU: ['USD', 'EUR'],
}

export const selectCurrencies: {[key in PlatformType]: AllCurrencyType[]} = {
  US: ['USD', 'USDC', 'USDT'],
  EU: ['USD', 'EUR', 'USDC', 'USDT'],
}
