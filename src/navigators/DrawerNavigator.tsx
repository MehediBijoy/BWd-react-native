import {View} from 'react-native'
import {Icon, makeStyles, useTheme} from '@rneui/themed'
import {WalletConnectModal} from '@walletconnect/modal-react-native'
import {createDrawerNavigator, DrawerScreenProps} from '@react-navigation/drawer'

import Hamburger from '@core/Hamburger'

import Logo from 'components/Logo'
import Profile from 'screens/profile'
import {sessionParams, providerMetadata, projectId} from 'constants/wallet.config'

import TabNavigator from './TabNavigator'
import type {RouteStack} from './routes'
import WalletButton from './WalletButton'
import DrawerContainer from './DrawerContainer'

const Drawer = createDrawerNavigator<RouteStack>()

const DrawerNavigator = () => {
  const {
    theme: {colors},
  } = useTheme()
  const styles = useStyles()

  return (
    <>
      <Drawer.Navigator
        drawerContent={DrawerContainer}
        screenOptions={({navigation}: DrawerScreenProps<RouteStack>) => ({
          headerTitle: '',
          headerStyle: styles.shadow,
          drawerLabelStyle: {marginLeft: -25},
          drawerActiveTintColor: colors.tertiary,
          drawerInactiveTintColor: colors.textPrimary,
          headerLeftContainerStyle: {marginStart: 10},
          headerRightContainerStyle: {marginEnd: 10},
          headerLeft: () => <Logo />,
          headerRight: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                columnGap: 20,
                alignItems: 'center',
              }}
            >
              <WalletButton />
              <Hamburger active onPress={() => navigation.openDrawer()} />
            </View>
          ),
        })}
      >
        <Drawer.Screen
          name='TabComponents'
          component={TabNavigator}
          options={{title: 'Dashboard', drawerIcon: props => <Icon name='dashboard' {...props} />}}
        />

        <Drawer.Screen
          name='Affiliates'
          component={Profile}
          options={{drawerIcon: props => <Icon name='supervised-user-circle' {...props} />}}
        />

        <Drawer.Screen
          name='Settings'
          component={Profile}
          options={{drawerIcon: props => <Icon name='settings' {...props} />}}
        />
      </Drawer.Navigator>

      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
        sessionParams={sessionParams}
      />
    </>
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
