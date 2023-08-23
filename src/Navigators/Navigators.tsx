import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import EmailConfirmation from '../screens/auth/ForgotPassword/EmailConfirmation'
import Login from '../screens/auth/Login/Login'
import ForgotPassword from '../screens/auth/ForgotPassword/ForgotPassword'
import ChangePassword from '../screens/auth/ForgotPassword/ChangePassword'

import routes from './routes'

const Stack = createNativeStackNavigator()

const Navigators = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.home.path}>
        <Stack.Screen name={routes.home.path} component={Login} options={{title: 'BWG'}} />
        <Stack.Screen
          name={routes.auth.resetPassword.path}
          component={ForgotPassword}
          options={{title: 'Forgot Password'}}
        />
        <Stack.Screen
          name={routes.auth.emailConfirmation.path}
          component={EmailConfirmation}
          options={{title: 'Email Confirmation'}}
        />
        <Stack.Screen
          name={routes.auth.changePassword.path}
          component={ChangePassword}
          options={{title: 'Change Password'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigators
