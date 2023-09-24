import {Text} from '@rneui/themed'
import {ScrollView} from 'react-native'

import ContentContainer from '@core/ContentContainer'

import Overview from './overview'
import ReferralTable from './referralTable'

const Affiliate = () => (
  <ScrollView>
    <ContentContainer>
      <Text h3 h3Style={{marginTop: 20}}>
        Affiliate Overview
      </Text>
      <Overview/>
      <ReferralTable />
    </ContentContainer>
  </ScrollView>
)

export default Affiliate
