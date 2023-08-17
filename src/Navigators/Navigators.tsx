import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Login from '../screens/auth/Login/Login'

import routes from './routes'

const Stack = createNativeStackNavigator()

const Navigators = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.home.path}>
        <Stack.Screen name={routes.home.path} component={Login} options={{title: 'BWG'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigators
