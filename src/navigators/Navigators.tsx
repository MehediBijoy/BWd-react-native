import React, {useEffect, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, Text} from '@rneui/themed'
import SplashScreen from 'react-native-splash-screen'
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack'

import Logo from 'components/Logo'
import Splash from 'components/Splash'
import MFA from 'screens/profile/MFA'
import Login from 'screens/auth/Login'
import {usePlatform, useProfile} from 'hooks/helper'
import {useLocales} from 'hooks/states'
import {useAuthToken} from 'hooks/api'
// import ZenDesk from 'components/ZenDesk'
import {isUserConfirmed} from 'utils/response'
import ChangeEmail from 'screens/profile/changeEmail'
import ResetPassword from 'screens/auth/ResetPassword'
import RegistrationProgress from 'screens/auth/Registration'
import ChangePassword from 'screens/profile/changePassword'
import BecomeAffiliate from 'screens/profile/becomeAffiliate'
import RegistrationForm from 'screens/auth/Registration/RegisterForm'
import DeleteAccountConfirm from 'screens/profile/DeleteAccount/DeleteAccountConfirm'
import OrderSummary from 'screens/BuyToken/BankTransfer/OrdersSummary'
import PaymentInformation from 'screens/BuyToken/BankTransfer/PaymentInformation'

import DrawerNavigator from './DrawerNavigator'
import type {RouteStack} from './routes'

const Stack = createNativeStackNavigator<RouteStack>()

const Navigators = () => {
  const {t} = useTranslation()
  const {profile} = useProfile()
  const {currentLang, hasHydrate} = useLocales()

  const {hasHydrate: isPlatform} = usePlatform()
  const {hasHydrate: isAuthToken, token} = useAuthToken()

  useEffect(() => {
    if (hasHydrate && isPlatform && isAuthToken) {
      SplashScreen.hide()
    }
  }, [hasHydrate, isPlatform, isAuthToken])

  const isSplashScreen = useMemo(() => {
    if (!token) return false
    if (token && !profile) return true
    return false
  }, [token, profile])

  return isSplashScreen ? (
    <Splash />
  ) : !profile ? (
    <>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            title: '',
            headerLeft: () => <Logo />,
            headerRight: () => <Text>{new String(currentLang ?? '').toUpperCase()}</Text>,
          }}
        >
          <Stack.Screen name='Login' component={Login} />
          <Stack.Group
            screenOptions={({navigation}: NativeStackScreenProps<RouteStack>) => ({
              headerBackVisible: false,
              headerRight: () => (
                <Button
                  title={t('forms.buttons.login')}
                  onPress={() => navigation.navigate('Login')}
                />
              ),
            })}
          >
            <Stack.Screen name='ResetPassword' component={ResetPassword} />
            <Stack.Screen name='RegistrationForm' component={RegistrationForm} />
          </Stack.Group>
        </Stack.Group>
      </Stack.Navigator>
      {/* <ZenDesk floating /> */}
    </>
  ) : !isUserConfirmed(profile) ? (
    <Stack.Navigator>
      <Stack.Screen
        name='RegistrationProgress'
        component={RegistrationProgress}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='DrawerComponents'
          options={{headerShown: false}}
          component={DrawerNavigator}
        />
        <Stack.Screen
          name='ProfileEmailChange'
          component={ChangeEmail}
          options={{title: t('navigation.items.emailChange'), headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name='ProfilePasswordChange'
          component={ChangePassword}
          options={{title: t('navigation.items.passwordChange'), headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name='ProfileMFA'
          component={MFA}
          options={{
            title: t('navigation.items.twoFactorAuthentication'),
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name='ProfileBecomeAffiliate'
          component={BecomeAffiliate}
          options={{
            title: t('navigation.items.becomeAnAffiliate'),
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name='DeleteAccount'
          component={DeleteAccountConfirm}
          options={{
            title: t('profile.deleteAccount.title'),
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name='OrderSummary'
          component={OrderSummary}
          options={{
            title: t('navigation.items.orderSummary'),
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name='PaymentInformation'
          component={PaymentInformation}
          options={{
            title: t('navigation.items.paymentInformation'),
            // headerBackVisible: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default Navigators
