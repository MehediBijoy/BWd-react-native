import React from 'react'
import {View} from 'react-native'
import {Button} from '@rneui/themed'
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack'

import Hamburger from '@core/Hamburger'

import Logo from 'components/Logo'
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
        <Stack.Group screenOptions={{headerTitle: Logo}}>
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
        <Stack.Group
          screenOptions={{
            headerTitle: Logo,
            headerRight: () => (
              <View style={{flexDirection: 'row', columnGap: 20, alignItems: 'center'}}>
                <Button size='md' title='Wallet Connect' titleStyle={{fontSize: 14}} />
                <Hamburger />
              </View>
            ),
          }}
        >
          <Stack.Screen name='Home' component={Dashboard} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

export default Navigators
