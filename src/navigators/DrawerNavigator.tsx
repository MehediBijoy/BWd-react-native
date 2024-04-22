import React from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {makeStyles, useTheme} from '@rneui/themed'
import {createDrawerNavigator, DrawerScreenProps} from '@react-navigation/drawer'
import {WalletConnectModal, useWalletConnectModal} from '@walletconnect/modal-react-native'

import Hamburger from '@core/Hamburger'

import Logo from 'components/Logo'
import Profile from 'screens/profile'
import Affiliate from 'screens/affiliate'
import GoldCard from 'screens/GoldCard'
import {useProfile} from 'hooks/helper'
import HomeIcon from 'images/home.svg'
import CardIcon from 'images/CardIcon.svg'
import SettingIcon from 'images/icons/Setting.svg'
import AffiliateIcon from 'images/icons/affiliate.svg'
import {sessionParams, providerMetadata, projectId} from 'constants/wallet.config'

import TabNavigator from './TabNavigator'
import type {RouteStack} from './routes'
import WalletButton from './WalletButton'
import DrawerContainer from './DrawerContainer'
import WalletController from './WalletController'

const Drawer = createDrawerNavigator<RouteStack>()

const DrawerNavigator = () => {
  const {
    theme: {colors},
  } = useTheme()
  const styles = useStyles()
  const {t} = useTranslation()
  const {profile} = useProfile()
  const {isConnected, provider} = useWalletConnectModal()

  return (
    <>
      <Drawer.Navigator
        id='drawer'
        drawerContent={DrawerContainer}
        screenOptions={({navigation, route}: DrawerScreenProps<RouteStack>) => ({
          headerTitle: '',
          unmountOnBlur: true,
          headerStyle: styles.shadow,
          drawerLabelStyle: {marginLeft: -25},
          drawerActiveTintColor: colors.tertiary,
          drawerInactiveTintColor: colors.textPrimary,
          headerLeftContainerStyle: {marginStart: 10},
          headerRightContainerStyle: {marginEnd: 10},
          headerLeft: () => (
            <Logo onPress={() => route.name !== 'Home' && navigation.navigate('Home')} />
          ),
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
          name='TabNavigation'
          component={TabNavigator}
          options={{
            title: t('navigation.items.dashboard'),
            // drawerIcon: props => <Icon name='dashboard' {...props} />,
            drawerIcon: ({size, color, ...props}) => (
              <HomeIcon height={size} width={size} fill={color} {...props} />
            ),
          }}
        />

        <Drawer.Screen
          name='GoldCard'
          component={GoldCard}
          options={{
            title: t('survey.goldCard.nav'),
            drawerIcon: ({size, color, ...props}) => (
              <CardIcon height={size} width={size} fill={color} {...props} />
            ),
          }}
        />

        {profile?.user_type === 'affiliate' && (
          <Drawer.Screen
            name='Affiliates'
            component={Affiliate}
            options={{
              title: t('navigation.items.affiliate'),
              // drawerIcon: props => <Icon name='supervised-user-circle' {...props} />,
              drawerIcon: ({size, color, ...props}) => (
                <AffiliateIcon height={size} width={size} fill={color} {...props} />
              ),
            }}
          />
        )}

        <Drawer.Screen
          name='Settings'
          component={Profile}
          options={{
            title: t('navigation.items.settings'),
            // drawerIcon: props => <Icon name='settings' {...props} />,
            drawerIcon: ({size, color, ...props}) => (
              <SettingIcon height={size} width={size} fill={color} {...props} />
            ),
          }}
        />
      </Drawer.Navigator>

      {!isConnected && (
        <WalletConnectModal
          projectId={projectId}
          providerMetadata={providerMetadata}
          sessionParams={sessionParams}
        />
      )}

      {/* Todo: avoid modal because ios throw error when modal twice modal opened at a time */}
      {isConnected && provider && <WalletController />}
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
