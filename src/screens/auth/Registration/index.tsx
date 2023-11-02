import React from 'react'
import {Button} from '@rneui/themed'
import {useTranslation} from 'react-i18next'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Logo from 'components/Logo'
import {useProfile} from 'hooks/helper'
// import ZenDesk from 'components/ZenDesk'
import {useOnUnauthorized} from 'hooks/api'
import {RouteStack} from 'navigators/routes'

import KycProcess from './KycProcess'
import EmailConfirm from './EmailConfirm'
import RegistrationSuccess from './Success'

const Stack = createNativeStackNavigator<RouteStack>()

const RegistrationProgress = () => {
  const {profile} = useProfile()
  const {t} = useTranslation()
  const unAuthorized = useOnUnauthorized()

  const isEmailConfirmed = React.useMemo(() => profile && profile.email_confirmed, [profile])

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTitle: Logo,
          headerRight: () => <Button title={t('forms.buttons.login')} onPress={unAuthorized} />,
        }}
      >
        <>
          {!isEmailConfirmed ? (
            <Stack.Screen name='RegistrationEmailConfirm' component={EmailConfirm} />
          ) : (
            <>
              <Stack.Screen name='RegistrationKycProcess' component={KycProcess} />
              <Stack.Screen name='RegistrationSuccess' component={RegistrationSuccess} />
            </>
          )}
        </>
      </Stack.Navigator>
      {/* <ZenDesk floating /> */}
    </>
  )
}

export default RegistrationProgress
