import React from 'react'
import {
  DrawerItemList,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'
import {View} from 'react-native'
import {useQuery} from '@tanstack/react-query'
import LinearGradient from 'react-native-linear-gradient'
import {Text, makeStyles, useTheme, Icon} from '@rneui/themed'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

import Pressable from '@core/Pressable'
import SafeAreaView from '@core/SafeAreaView'
import CopyButton from '@core/CopyButton'

import {useBalance} from 'hooks/crypto'
import Logo from 'components/Logo'
import {usePlatform, useProfile} from 'hooks/helper'
import {cacheKey} from 'api/CacheKey'
import {useApi, useOnUnauthorized} from 'hooks/api'

const DrawerContainer = (props: DrawerContentComponentProps) => {
  const api = useApi()
  const {theme} = useTheme()
  const styles = useStyles()
  const {APP_URL} = usePlatform()
  const {profile} = useProfile()
  const onUnauthorized = useOnUnauthorized()

  const {data: userDetails} = useQuery({
    queryKey: [cacheKey.userDetails, profile?.id],
    queryFn: () => api.getUserInfo(profile?.id as number),
    enabled: !!profile?.id,
  })

  const {balance: BwgBalance} = useBalance({token: 'BWG', watch: true})
  const {isConnected} = useWalletConnectModal()

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={{flex: 1}}>
        <DrawerContentScrollView contentContainerStyle={{paddingTop: 0}} {...props}>
          <LinearGradient
            style={styles.header}
            colors={[theme.colors.tertiary, theme.colors.tertiaryDark]}
          >
            <Logo height={80} width={80} />

            <Text style={styles.title}>{`${userDetails?.user_detail?.first_name ?? ''} ${
              userDetails?.user_detail?.last_name ?? ''
            }`}</Text>

            {isConnected && <Text style={styles.subTitle}>{BwgBalance?.value.toFixed(3)} BWG</Text>}
          </LinearGradient>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <View style={styles.footer}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={styles.footerItem}>
              <Icon name='share' />
              <Text style={styles.footerText}>Refer a friend</Text>
            </View>
            <CopyButton
              style={{marginRight: 10}}
              toCopy={`${APP_URL}/invite?token=${profile?.referral_token}`}
              size='sm'
            />
          </View>
          <Pressable style={styles.footerItem} onPress={() => onUnauthorized()}>
            <Icon name='logout' />
            <Text style={styles.footerText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const useStyles = makeStyles(({colors}) => ({
  header: {
    height: 200,
    paddingLeft: 20,
    paddingBottom: 20,
    rowGap: 5,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textReverse,
  },
  subTitle: {
    fontSize: 13,
    color: colors.textReverse,
  },
  footer: {
    height: 100,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 2,
    borderRadius: 2,
    borderTopColor: colors.textPrimary,
    justifyContent: 'space-between',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 7,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
}))

export default DrawerContainer
