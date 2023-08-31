import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {isUserConfirmed} from 'utils'
import Login from 'screens/auth/Login'
import {useProfile} from 'hooks/helper'
import Dashboard from 'screens/dashboard'
import RegistrationProgress from 'screens/auth/Registration'
import RegistrationForm from 'screens/auth/Registration/RegisterForm'
import ResetPassword from 'screens/auth/ResetPassword'

import type {RouteStack} from './routes'

const Stack = createNativeStackNavigator<RouteStack>()

const Navigators = () => {
  const {profile} = useProfile()

  return (
    <Stack.Navigator>
      {!profile ? (
        <>
          <Stack.Screen name='Login' component={Login} options={{title: 'BWG'}} />
          <Stack.Screen
            name='ResetPassword'
            component={ResetPassword}
            options={{title: 'Forgot Password'}}
          />
          <Stack.Screen name='RegistrationForm' component={RegistrationForm} />
        </>
      ) : !isUserConfirmed(profile) ? (
        <Stack.Screen
          name='RegistrationProgress'
          component={RegistrationProgress}
          options={{title: 'Registration'}}
        />
      ) : (
        <>
          <Stack.Screen name='Home' component={Dashboard} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default Navigators
