import {ScrollView} from 'react-native'
import {useQuery} from '@tanstack/react-query'

import ContentContainer from '@core/ContentContainer'

import {useProfile} from 'hooks/helper'
import {useApi} from 'hooks/api'
import {cacheKey} from 'api'

import PersonalInfoBox from './personalInfoBox'
import ProfileSettings from './profileSettings'

const Profile = () => {
  const {profile} = useProfile()
  const api = useApi()

  const {data: userDetails} = useQuery({
    queryKey: [cacheKey.userDetails, profile?.id],
    queryFn: () => api.getUserInfo(profile?.id),
    enabled: !!profile?.id,
  })
  return (
    <ScrollView>
      <ContentContainer>
        <PersonalInfoBox userInfo={userDetails} />
        <ProfileSettings userInfo={userDetails} />
      </ContentContainer>
    </ScrollView>
  )
}

export default Profile
