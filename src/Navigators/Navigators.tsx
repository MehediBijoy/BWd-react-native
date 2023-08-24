import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {useAuthToken} from 'hooks/api'
import {useProfile} from 'hooks/helper'
import Login from 'screens/auth/Login'
import Dashboard from 'screens/dashboard'
import RegisterForm from 'screens/auth/Registration/RegisterForm'

import routes from './routes'

const Stack = createNativeStackNavigator()

const Navigators = () => {
  const {token} = useAuthToken()
  const {profile} = useProfile()

  const isAuth = React.useMemo(() => Boolean(token && profile), [token, profile])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuth ? routes.home.path : routes.auth.login.path}>
        {!isAuth ? (
          <>
            <Stack.Screen
              name={routes.auth.login.path}
              component={Login}
              options={{title: 'BWG'}}
            />
            <Stack.Screen
              name={routes.auth.register.path}
              component={RegisterForm}
              options={{title: 'Registration'}}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={routes.home.path} component={Dashboard} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigators
