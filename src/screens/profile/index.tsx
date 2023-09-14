import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {RouteStack} from 'navigators/routes'

import ProfileInfo from './Profile'
import ChangeEmail from './changeEmail'
import ChangePassword from './changePassword'

const Stack = createNativeStackNavigator<RouteStack>()

const Profile = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Settings' component={ProfileInfo} options={{headerShown: false}} />
      <Stack.Screen name='EmailChange' component={ChangeEmail} options={{title: 'Email Change'}} />
      <Stack.Screen
        name='PasswordChange'
        component={ChangePassword}
        options={{title: 'Password Change'}}
      />
    </Stack.Navigator>
  )
}

export default Profile
