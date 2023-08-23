import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Login from 'screens/auth/Login'
import RegisterForm from 'screens/auth/Registration/RegisterForm'

import routes from './routes'

const Stack = createNativeStackNavigator()

const Navigators = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.auth.register.path}>
        <Stack.Screen name={routes.home.path} component={Login} options={{title: 'BWG'}} />
        <Stack.Screen
          name={routes.auth.register.path}
          component={RegisterForm}
          options={{title: 'Registration'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigators
