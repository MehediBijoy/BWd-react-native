import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'

import {useLocales} from 'hooks/states'
import SwitchSelectors from 'components/SwitchSelectors'

import {languageConfig} from './switch.config'

const AppSettings = () => {
  const styles = useStyles()
  const {currentLang, onChange: onChangeLang} = useLocales()

  // const {currency, setCurrencyValue} = useLocalCurrency()

  // const onChangeSwitch = (id: string) => {
  //   setCurrencyValue(id)
  // }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Currency </Text>
      <SwitchSelectors data={switchConfig} onChange={onChangeSwitch} active={currency} /> */}
      <Text style={styles.title}>Language</Text>
      <SwitchSelectors data={languageConfig} onChange={onChangeLang} active={currentLang} />
    </View>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 20,
  },
  title: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '700',
  },
}))

export default AppSettings
