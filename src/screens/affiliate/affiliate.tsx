import {Text} from '@rneui/themed'
import {ScrollView} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import ContentContainer from '@core/ContentContainer'

import {RouteStack} from 'navigators/routes'

import Overview from './overview'
import ReferralTable from './referralTable'

const Affiliate = ({navigation}: NativeStackScreenProps<RouteStack, 'Affiliates'>) => (
  <ScrollView>
    <ContentContainer>
      <Text h3 h3Style={{marginTop: 20}}>
        Affiliate Overview
      </Text>
      <Overview navigation={navigation} />
      <ReferralTable />
    </ContentContainer>
  </ScrollView>
)

export default Affiliate
