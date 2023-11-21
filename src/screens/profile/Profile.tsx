import {ScrollView, View} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import Loader from '@core/Loader'
import SafeAreaView from '@core/SafeAreaView'
import ContentContainer from '@core/ContentContainer'

import {RouteStack} from 'navigators/routes'
import {useProfileDetails} from 'hooks/helper'

import AppSettings from './AppSettings'
import PersonalInfoBox from './personalInfoBox'
import ProfileSettings from './profileSettings'
import ReferralInfoBox from './ReferralInfoBox'
import DeleteAccount from './DeleteAccount'

const ProfileInfo = ({navigation}: NativeStackScreenProps<RouteStack, 'Settings'>) => {
  const {data: userDetails, isLoading} = useProfileDetails()

  if (isLoading) {
    return (
      <View
        style={{
          minHeight: '100%',
          minWidth: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader />
      </View>
    )
  }

  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView>
        <ContentContainer>
          <PersonalInfoBox userInfo={userDetails} />
          <ProfileSettings userInfo={userDetails} />
          <ReferralInfoBox navigation={navigation} />
          {/*Note: This functionality will be add in future  */}
          <AppSettings />
          <DeleteAccount navigation={navigation} />
        </ContentContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileInfo
