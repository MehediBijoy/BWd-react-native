import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {CurrencyTypes, availableCurrency} from 'constants/currency.config'

interface IState {
  default: CurrencyTypes
  currency: CurrencyTypes
  available: readonly string[]
  onChange: (currency: CurrencyTypes) => void
}

const useCurrency = create<IState>()(
  persist(
    set => ({
      default: availableCurrency[0],
      currency: availableCurrency[0],
      available: availableCurrency,
      onChange: currency => set(states => ({...states, currency})),
    }),
    {
      name: 'currency',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useCurrency
