import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {isUserConfirmed} from 'utils'
import Login from 'screens/auth/Login'
import {useProfile} from 'hooks/helper'
import Dashboard from 'screens/dashboard'
import RegistrationProgress from 'screens/auth/Registration'
import RegistrationForm from 'screens/auth/Registration/RegisterForm'
import ForgotPassword from 'screens/auth/ForgotPassword/ForgotPassword'
import ChangePassword from 'screens/auth/ForgotPassword/ChangePassword'
import EmailConfirmation from 'screens/auth/ForgotPassword/EmailConfirmation'

import type {RouteStack} from './routes'

const Stack = createNativeStackNavigator<RouteStack>()

const Navigators = () => {
  const {profile} = useProfile()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!profile ? (
          <>
            <Stack.Screen name='Login' component={Login} options={{title: 'BWG'}} />
            <Stack.Screen
              name='ForgetPassword'
              component={ForgotPassword}
              options={{title: 'Forgot Password'}}
            />
            <Stack.Screen
              name='EmailConfirmation'
              component={EmailConfirmation}
              options={{title: 'Email Confirmation'}}
            />
            <Stack.Screen
              name='ChangePassword'
              component={ChangePassword}
              options={{title: 'Change Password'}}
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
    </NavigationContainer>
  )
}

export default Navigators
