import {View} from 'react-native'
import {Button, makeStyles} from '@rneui/themed'
import {createDrawerNavigator, DrawerScreenProps} from '@react-navigation/drawer'

import Hamburger from '@core/Hamburger'

import Logo from 'components/Logo'
import Profile from 'screens/profile'

import TabNavigator from './TabNavigator'
import type {RouteStack} from './routes'

const Drawer = createDrawerNavigator<RouteStack>()

const DrawerNavigator = () => {
  const styles = useStyles()

  return (
    <Drawer.Navigator
      screenOptions={({navigation}: DrawerScreenProps<RouteStack>) => ({
        headerTitle: '',
        headerStyle: styles.shadow,
        headerLeftContainerStyle: {marginStart: 10},
        headerRightContainerStyle: {marginEnd: 10},
        headerLeft: () => <Logo />,
        headerRight: () => (
          <View style={{flexDirection: 'row', columnGap: 20, alignItems: 'center'}}>
            <Button size='md' title='Wallet Connect' titleStyle={{fontSize: 14}} />
            <Hamburger active onPress={() => navigation.openDrawer()} />
          </View>
        ),
      })}
    >
      <Drawer.Screen name='TabComponents' component={TabNavigator} options={{title: 'Home'}} />
      <Drawer.Screen name='Profile' component={Profile} />
    </Drawer.Navigator>
  )
}

const useStyles = makeStyles(({colors}) => ({
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
}))

export default DrawerNavigator
