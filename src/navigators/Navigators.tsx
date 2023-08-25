import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import EmailConfirmation from 'screens/auth/ForgotPassword/EmailConfirmation'
import ForgotPassword from 'screens/auth/ForgotPassword/ForgotPassword'
import ChangePassword from 'screens/auth/ForgotPassword/ChangePassword'
import {useAuthToken} from 'hooks/api'
import {useProfile} from 'hooks/helper'
import Login from 'screens/auth/Login'
import Dashboard from 'screens/dashboard'
import RegisterForm from 'screens/auth/Registration/RegisterForm'

import type {RootStackParamList} from './routes'

const Stack = createNativeStackNavigator<RootStackParamList>()

const Navigators = () => {
  const {token} = useAuthToken()
  const {profile} = useProfile()

  const isAuth = React.useMemo(() => Boolean(token && profile), [token, profile])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuth ? 'Home' : 'Login'}>
        {!isAuth ? (
          <>
            <Stack.Screen name={'Login'} component={Login} options={{title: 'BWG'}} />

            <Stack.Screen
              name={'ForgetPassword'}
              component={ForgotPassword}
              options={{title: 'Forgot Password'}}
            />
            <Stack.Screen
              name={'EmailConfirmation'}
              component={EmailConfirmation}
              options={{title: 'Email Confirmation'}}
            />
            <Stack.Screen
              name='ChangePassword'
              component={ChangePassword}
              options={{title: 'Change Password'}}
            />
            <Stack.Screen
              name={'Registration'}
              component={RegisterForm}
              options={{title: 'Registration'}}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={'Home'} component={Dashboard} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigators
