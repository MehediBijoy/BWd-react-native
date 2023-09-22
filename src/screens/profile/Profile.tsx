import {ScrollView, View} from 'react-native'
import {useQuery} from '@tanstack/react-query'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import ContentContainer from '@core/ContentContainer'
import Loader from '@core/Loader'

import {useProfile} from 'hooks/helper'
import {useApi} from 'hooks/api'
import {cacheKey} from 'api'
import {RouteStack} from 'navigators/routes'

import PersonalInfoBox from './personalInfoBox'
import ProfileSettings from './profileSettings'
import ReferralInfoBox from './ReferralInfoBox'

const ProfileInfo = ({navigation}: NativeStackScreenProps<RouteStack, 'Settings'>) => {
  const {profile} = useProfile()
  const api = useApi()

  const {data: userDetails, isLoading} = useQuery({
    queryKey: [cacheKey.userDetails, profile?.id],
    queryFn: () => api.getUserInfo(profile?.id as number),
    enabled: !!profile?.id,
  })

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
    <ScrollView>
      <ContentContainer>
        <PersonalInfoBox userInfo={userDetails} />
        <ProfileSettings userInfo={userDetails} />
        <ReferralInfoBox userInfo={userDetails} navigation={navigation} />
        {/*Note: This functionality will be add in future  */}
        {/* <AppSettings /> */}
      </ContentContainer>
    </ScrollView>
  )
}

export default ProfileInfo
