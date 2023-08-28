import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {useProfile} from 'hooks/helper'
import {RouteStack} from 'navigators/routes'

import KycProcess from './KycProcess'
import EmailConfirm from './EmailConfirm'
import RegistrationSuccess from './Success'

const Stack = createNativeStackNavigator<RouteStack>()

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
          <>
            <Stack.Screen name='RegistrationKycProcess' component={KycProcess} />
            <Stack.Screen name='RegistrationSuccess' component={RegistrationSuccess} />
          </>
        )}
      </>
    </Stack.Navigator>
  )
}

export default RegistrationProgress
