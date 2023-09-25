import {NativeStackScreenProps} from '@react-navigation/native-stack'

import ContainContainer from '@core/ContentContainer'

import {useProfile} from 'hooks/helper'
import {RouteStack} from 'navigators/routes'

import MFAActive from './MFAActive'
import MFADeactive from './MFADeactive'

const MFA = ({navigation}: NativeStackScreenProps<RouteStack, 'ProfileMFA'>) => {
  const {profile} = useProfile()

  return (
    <ContainContainer>
      {!profile?.google_mfa_activated ? (
        <MFAActive navigation={navigation} />
      ) : (
        <MFADeactive navigation={navigation} />
      )}
    </ContainContainer>
  )
}

export default MFA
