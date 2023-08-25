import {View, Text} from 'react-native'

import Accordion from 'components/Accordion'

import config from './faq.config'

const FAQ = () => {
  return (
    <>
      <View>
        <Text style={{fontSize: 20, marginTop: 20}}>FAQ</Text>
      </View>
      <View style={{marginBottom: 10, marginTop: 10}}>
        <Accordion data={config} />
      </View>
    </>
  )
}

export default FAQ
