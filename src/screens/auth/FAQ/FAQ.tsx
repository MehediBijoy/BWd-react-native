import {Text} from '@rneui/themed'
import {View} from 'react-native'

import Accordion from '@core/Accordion'

import config from './faq.config'

const FAQ = () => (
  <View style={{marginTop: 20}}>
    <Text h3>FAQ</Text>
    <View style={{marginBottom: 10, marginTop: 10}}>
      <Accordion data={config} />
    </View>
  </View>
)

export default FAQ
