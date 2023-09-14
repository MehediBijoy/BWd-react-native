import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'

import {useLocalCurrency} from 'hooks/helper'
import SwitchSelectors from 'components/SwitchSelectors'

import {switchConfig} from './switch.config'

const AppSettings = () => {
  const styles = useStyles()

  const {currency, setCurrencyValue} = useLocalCurrency()

  const onChangeSwitch = (id: string) => {
    setCurrencyValue(id)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency </Text>
      <SwitchSelectors data={switchConfig} onChange={onChangeSwitch} active={currency} />
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
