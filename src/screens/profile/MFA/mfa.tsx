import {NativeStackScreenProps} from '@react-navigation/native-stack'

import ContainContainer from '@core/ContentContainer'

import {useProfile} from 'hooks/helper'
import {RouteStack} from 'navigators/routes'

import MFAActive from './MFAActive'
import MFADeactive from './MFADeactive'

const MFA = ({navigation, route}: NativeStackScreenProps<RouteStack>) => {
  const {profile} = useProfile()
  if (!profile) return null
  return (
    <ContainContainer>
      {!profile.google_mfa_activated ? (
        <MFAActive navigation={navigation} route={route} />
      ) : (
        <MFADeactive navigation={navigation} route={route} />
      )}
    </ContainContainer>
  )
}

export default MFA
