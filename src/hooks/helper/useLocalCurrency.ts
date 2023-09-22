import {useCallback, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useLocalCurrency = () => {
  const [currency, setCurrency] = useState<string>('')

  useEffect(() => {
    getStoredCurrency()
  }, [setCurrency, currency])

  async function getStoredCurrency() {
    try {
      const storedCurrency = await AsyncStorage.getItem('buy-token-asset')
      if (storedCurrency === null) setCurrency('USD')
      storedCurrency && setCurrency(storedCurrency)
    } catch (error) {
      /* empty */
    }
  }

  const setCurrencyValue = useCallback(
    async (changeCurrency: string) => {
      try {
        await AsyncStorage.setItem('buy-token-asset', changeCurrency)
        setCurrency(changeCurrency)
      } catch (error) {
        /* empty */
      }
    },
    [setCurrency]
  )

  return {currency, setCurrencyValue}
}

export default useLocalCurrency
