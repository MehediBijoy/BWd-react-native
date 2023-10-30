// export {default} from './ForgotPassword'

import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {RouteStack} from 'navigators/routes'
import EmailVerification from 'screens/auth/ResetPassword/ForgetPassword'
import ChangePassword from 'screens/auth/ResetPassword/ChangePassword'
import EmailConfirmation from 'screens/auth/ResetPassword/EmailConfirmation'

const Stack = createNativeStackNavigator<RouteStack>()

const ResetPassword = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen
      name='ResetEmailVerification'
      component={EmailVerification}
      options={{title: 'Email Verification'}}
    />
    <Stack.Screen
      name='ResetEmailConfirmation'
      component={EmailConfirmation}
      options={{title: 'Email Confirmation'}}
    />
    <Stack.Screen
      name='ChangePassword'
      component={ChangePassword}
      options={{title: 'Change Password'}}
    />
  </Stack.Navigator>
)

export default ResetPassword
