import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const availableCurrency = ['USD', 'EUR'] as const
export type CurrencyTypes = (typeof availableCurrency)[number]

interface IState {
  default: CurrencyTypes
  current: CurrencyTypes
  available: readonly string[]
  onChange: (currency: CurrencyTypes) => void
}

const useCurrency = create<IState>()(
  persist(
    set => ({
      default: availableCurrency[0],
      current: availableCurrency[0],
      available: availableCurrency,
      onChange: currency => set(states => ({...states, current: currency})),
    }),
    {
      name: 'currency',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useCurrency
