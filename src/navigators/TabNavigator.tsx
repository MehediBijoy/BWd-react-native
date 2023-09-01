import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Dashboard from 'screens/dashboard'
import Transactions from 'screens/transactions'
import Notifications from 'screens/Notifications'

import type {RouteStack} from './routes'

const Tab = createBottomTabNavigator<RouteStack>()

const TabNavigator = () => (
  <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
    <Tab.Screen name='Home' component={Dashboard} />
    <Tab.Screen name='Transactions' component={Transactions} />
    <Tab.Screen name='Notifications' component={Notifications} />
  </Tab.Navigator>
)

export default TabNavigator
