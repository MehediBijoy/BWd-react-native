import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'
import {useEffect, useState} from 'react'

import {useLocalCurrency} from 'hooks/helper'
import SwitchSelectors from 'components/SwitchSelectors'

import {switchConfig} from './switch.config'

const AppSettings = () => {
  const {currency, setCurrencyValue} = useLocalCurrency()
  const [active, setActive] = useState<string>(currency)

  const styles = useStyles()

  useEffect(() => {
    setActive(currency)
  }, [currency])

  const onChangeSwitch = (id: string) => {
    setActive(id)
    setCurrencyValue(id)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency </Text>
      <SwitchSelectors data={switchConfig} onChange={onChangeSwitch} active={active} />
    </View>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
}))

export default AppSettings
