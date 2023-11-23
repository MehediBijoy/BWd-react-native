import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Divider, Text, makeStyles} from '@rneui/themed'

import {useLocales, useCurrency} from 'hooks/states'
import SwitchSelectors from 'components/SwitchSelectors'

import {languageConfig, switchConfig} from './switch.config'

const AppSettings = () => {
  const styles = useStyles()
  const {t} = useTranslation()
  const {onChange, current} = useCurrency()
  const {currentLang, onChange: onChangeLang} = useLocales()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency </Text>
      <SwitchSelectors data={switchConfig} onChange={onChange} active={current} />
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
