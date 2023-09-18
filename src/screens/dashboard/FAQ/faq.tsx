import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/base'

import Accordion from '@core/Accordion'

import {config} from './faq.config'

const FAQ = () => {
  const styles = useStyles()
  return (
    <View style={styles.container}>
      <Text h4>FAQ</Text>
      <View style={styles.accordionWrapper}>
        <Accordion data={config} />
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
