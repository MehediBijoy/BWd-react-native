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
      console.error('Error retrieving currency:', error)
    }
  }

  const setCurrencyValue = useCallback(
    async (changeCurrency: string) => {
      try {
        await AsyncStorage.setItem('buy-token-asset', changeCurrency)
        setCurrency(changeCurrency)
      } catch (error) {
        console.error('Error saving currency:', error)
      }
    },
    [setCurrency]
  )

  return {currency, setCurrencyValue}
}

export default useLocalCurrency
