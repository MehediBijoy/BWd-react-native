import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {FiatCurrencyTypes, availableFiatCurrency} from 'constants/currency.config'

interface IState {
  default: FiatCurrencyTypes
  currency: FiatCurrencyTypes
  available: readonly string[]
  onChange: (currency: FiatCurrencyTypes) => void
}

const useCurrency = create<IState>()(
  persist(
    set => ({
      default: availableFiatCurrency[0],
      currency: availableFiatCurrency[0],
      available: availableFiatCurrency,
      onChange: currency => set(states => ({...states, currency})),
    }),
    {
      name: 'currency',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useCurrency
