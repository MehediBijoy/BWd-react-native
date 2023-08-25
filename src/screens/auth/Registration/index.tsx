import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {useProfile} from 'hooks/helper'
import {RootStackParamList} from 'navigators/routes'

import KycProcess from './KycProcess'
import EmailConfirm from './EmailConfirm'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RegistrationProgress = () => {
  const {profile} = useProfile()

  const isEmailConfirmed = React.useMemo(() => {
    return profile && profile.email_confirmed
  }, [profile])

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <>
        {!isEmailConfirmed ? (
          <Stack.Screen name='RegistrationEmailConfirm' component={EmailConfirm} />
        ) : (
          <Stack.Screen name='RegistrationKycProcess' component={KycProcess} />
        )}
      </>
    </Stack.Navigator>
  )
}

export default RegistrationProgress
