import {Text} from '@rneui/themed'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'

import Accordion from '@core/Accordion'

import config from './faq.config'

const FAQ = () => {
  const {t} = useTranslation()
  return (
    <View style={{marginTop: 20}}>
      <Text h3>{t('faq.faq')}</Text>
      <View style={{marginBottom: 10, marginTop: 10}}>
        <Accordion data={config(t)} />
      </View>
    </View>
  )
}

export default FAQ
