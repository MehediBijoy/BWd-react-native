import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Text, makeStyles} from '@rneui/themed'

import Accordion from '@core/Accordion'

import {config} from './faq.config'

const FAQ = () => {
  const {t} = useTranslation()
  const styles = useStyles()
  return (
    <View style={styles.container}>
      <Text h4>{t('faq.faq')}</Text>
      <View style={styles.accordionWrapper}>
        <Accordion data={config(t)} />
      </View>
    </View>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 20,
  },
  accordionWrapper: {
    marginVertical: 10,
  },
}))

export default FAQ
