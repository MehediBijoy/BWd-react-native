import React from 'react'
import {Button} from '@rneui/themed'
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack'

import Logo from 'components/Logo'
import {isUserConfirmed} from 'utils'
import Login from 'screens/auth/Login'
import {useProfile} from 'hooks/helper'
import ResetPassword from 'screens/auth/ResetPassword'
import RegistrationProgress from 'screens/auth/Registration'
import RegistrationForm from 'screens/auth/Registration/RegisterForm'

import type {RouteStack} from './routes'
import DrawerNavigator from './DrawerNavigator'

const Stack = createNativeStackNavigator<RouteStack>()

const Navigators = () => {
  const {profile} = useProfile()

  return (
    <Stack.Navigator>
      {!profile ? (
        <Stack.Group
          screenOptions={{
            title: '',
            headerLeft: () => <Logo />,
          }}
        >
          <Stack.Screen name='Login' component={Login} />
          <Stack.Group
            screenOptions={({navigation}: NativeStackScreenProps<RouteStack>) => ({
              headerBackVisible: false,
              headerRight: () => (
                <Button title='Login' onPress={() => navigation.navigate('Login')} />
              ),
            })}
          >
            <Stack.Screen name='ResetPassword' component={ResetPassword} />
            <Stack.Screen name='RegistrationForm' component={RegistrationForm} />
          </Stack.Group>
        </Stack.Group>
      ) : !isUserConfirmed(profile) ? (
        <Stack.Screen
          name='RegistrationProgress'
          component={RegistrationProgress}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name='DrawerComponents' component={DrawerNavigator} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

export default Navigators
