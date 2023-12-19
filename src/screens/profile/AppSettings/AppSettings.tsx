import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Divider, Text, makeStyles} from '@rneui/themed'

import {usePlatform} from 'hooks/helper'
import {useLocales, useCurrency} from 'hooks/states'
import SwitchSelectors from 'components/SwitchSelectors'

import {languageConfig} from './switch.config'
import {getCurrencyConfig} from './currencySwitch.config'

const AppSettings = () => {
  const styles = useStyles()
  const {t} = useTranslation()
  const {platform} = usePlatform()
  const currencyConfig = getCurrencyConfig(platform)
  const {onChange, currency} = useCurrency()
  const {currentLang, onChange: onChangeLang} = useLocales()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency </Text>
      <SwitchSelectors data={currencyConfig} onChange={onChange} active={currency} />
      <Divider style={{marginVertical: 10}} />
      <Text style={styles.title}>{t('profile.appSettings.languageSelector')}</Text>
      <SwitchSelectors data={languageConfig(t)} onChange={onChangeLang} active={currentLang} />
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
