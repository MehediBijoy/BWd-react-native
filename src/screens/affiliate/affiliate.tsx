import {Text} from '@rneui/themed'
import {ScrollView} from 'react-native'

import ContentContainer from '@core/ContentContainer'
import SafeAreaView from '@core/SafeAreaView'

import Overview from './overview'
import ReferralTable from './referralTable'

const Affiliate = () => (
  <SafeAreaView edges={['bottom']}>
    <ScrollView>
      <ContentContainer>
        <Text h3 h3Style={{marginTop: 20}}>
          Affiliate Overview
        </Text>
        <Overview />
        <ReferralTable />
      </ContentContainer>
    </ScrollView>
  </SafeAreaView>
)

export default Affiliate
