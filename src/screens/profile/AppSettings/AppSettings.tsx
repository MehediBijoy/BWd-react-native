import {Text} from '@rneui/themed'
import {View} from 'react-native'
import {useEffect, useState} from 'react'

import Switch from '@core/Switch'

import {useLocalCurrency} from 'hooks/helper'

const AppSettings = () => {
  const {currency, setCurrencyValue} = useLocalCurrency()

  const [usdEnabled, setUsdEnabled] = useState<boolean>(false)
  const [eurEnabled, setEurEnabled] = useState<boolean>(false)

  useEffect(() => {
    if (currency === 'USD') {
      setUsdEnabled(true)
      setEurEnabled(false)
    } else if (currency === 'EUR') {
      setEurEnabled(true)
      setUsdEnabled(false)
    }
  }, [currency])

  const handleUsd = () => {
    if (usdEnabled) {
      setCurrencyValue('EUR')
    } else {
      setCurrencyValue('USD')
    }
    setUsdEnabled(!usdEnabled)
  }

  const handleEur = () => {
    if (eurEnabled) {
      setCurrencyValue('USD')
    } else {
      setCurrencyValue('EUR')
    }
    setEurEnabled(!eurEnabled)
  }

  return (
    <View>
      <Text>Currency </Text>
      <View>
        <Text>USD</Text>
        <Switch active={usdEnabled} onChange={handleUsd} />
      </View>
      <View>
        <Text>EUR</Text>
        <Switch active={eurEnabled} onChange={handleEur} />
      </View>
    </View>
  )
}

export default AppSettings
