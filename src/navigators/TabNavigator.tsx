import {Platform} from 'react-native'
import {Icon, useTheme} from '@rneui/themed'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Dashboard from 'screens/dashboard'
import Transactions from 'screens/transactions'
import BuyToken from 'screens/BuyToken'
import Notifications from 'screens/Notifications'

import type {RouteStack} from './routes'

const Tab = createBottomTabNavigator<RouteStack>()

const TabNavigator = () => {
  const {
    theme: {colors},
  } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tertiary,
        tabBarInactiveTintColor: colors.textPrimary,
        tabBarLabelStyle: {
          fontSize: 14,
          paddingBottom: 10,
        },
        tabBarStyle: {padding: 10, height: Platform.OS === 'ios' ? 100 : 65},
      }}
    >
      <Tab.Screen
        name='Home'
        component={Dashboard}
        options={{
          tabBarIcon: props => <Icon name='dashboard' type='material-icons' {...props} />,
        }}
      />
      <Tab.Screen
        name='Purchase'
        component={BuyToken}
        options={{
          tabBarIcon: props => <Icon name='bag-add' type='ionicon' {...props} />,
        }}
      />
      <Tab.Screen
        name='Transactions'
        component={Transactions}
        options={{
          tabBarIcon: props => (
            <Icon name='text-box-check-outline' type='material-community' {...props} />
          ),
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={Notifications}
        options={{
          tabBarBadge: 5,
          tabBarBadgeStyle: {marginTop: -6, marginLeft: -2},
          tabBarIcon: props => <Icon name='notifications' type='material-icons' {...props} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
