import {Icon, useTheme} from '@rneui/themed'
import {useTranslation} from 'react-i18next'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import BuyToken from 'screens/BuyToken'
import Dashboard from 'screens/dashboard'
import Transactions from 'screens/transactions'
import PurchaseIcon from 'images/purchase.svg'
import HomeIcon from 'images/home.svg'
// import Notifications from 'screens/Notifications'

import type {RouteStack} from './routes'

const Tab = createBottomTabNavigator<RouteStack>()

const TabNavigator = () => {
  const {
    theme: {colors},
  } = useTheme()
  const {t} = useTranslation()
  const {bottom: bottomOffset} = useSafeAreaInsets()

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tertiary,
        tabBarInactiveTintColor: colors.textPrimary,
        unmountOnBlur: true,
        tabBarLabelStyle: {
          fontSize: 14,
          paddingBottom: 10,
        },
        tabBarStyle: {padding: 10, height: bottomOffset + 65},
      }}
    >
      <Tab.Screen
        name='Home'
        component={Dashboard}
        options={{
          title: t('navigation.items.home'),
          // tabBarIcon: props => <Icon name='dashboard' type='material-icons' {...props} />,
          tabBarIcon: ({size, color, ...props}) => (
            <HomeIcon height={size} width={size} fill={color} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name='Purchase'
        component={BuyToken}
        options={{
          title: t('navigation.items.purchaseBWG'),
          // tabBarIcon: props => <Icon name='bag-add' type='ionicon' {...props} />,
          tabBarIcon: ({size, color, ...props}) => (
            <PurchaseIcon height={size} width={size} fill={color} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name='Transactions'
        component={Transactions}
        options={{
          title: t('navigation.items.trade'),
          tabBarIcon: props => (
            <Icon name='text-box-check-outline' type='material-community' {...props} />
          ),
        }}
      />
      {/* Todo: will add notification screen later */}
      {/* <Tab.Screen
        name='Notifications'
        component={Notifications}
        options={{
          tabBarBadge: 5,
          tabBarBadgeStyle: {marginTop: -6, marginLeft: -2},
          tabBarIcon: props => <Icon name='notifications' type='material-icons' {...props} />,
        }}
      /> */}
    </Tab.Navigator>
  )
}

export default TabNavigator
