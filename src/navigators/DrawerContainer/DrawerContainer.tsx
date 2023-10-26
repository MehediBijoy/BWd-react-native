import React from 'react'
import {
  DrawerItemList,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'
import {useQuery} from '@tanstack/react-query'
import {TouchableOpacity, View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Text, makeStyles, useTheme, Icon, Divider} from '@rneui/themed'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

import SafeAreaView from '@core/SafeAreaView'
import CopyButton from '@core/CopyButton'

import {useBalance} from 'hooks/crypto'
import Logo from 'components/Logo'
import {usePlatform, useProfile} from 'hooks/helper'
import {cacheKey} from 'api/CacheKey'
import {useApi, useOnUnauthorized} from 'hooks/api'
// import ZenDesk from 'components/ZenDesk'
import {alpha} from 'utils'

const DrawerContainer = (props: DrawerContentComponentProps) => {
  const api = useApi()
  const {theme} = useTheme()
  const styles = useStyles()
  const {APP_URL} = usePlatform()
  const {profile} = useProfile()
  const onUnauthorized = useOnUnauthorized()
  const {bottom: bottomInset} = useSafeAreaInsets()

  const {data: user} = useQuery({
    queryKey: [cacheKey.userDetails, profile?.id],
    queryFn: () => api.getUserInfo(profile?.id as number),
    enabled: !!profile?.id,
  })

  const {balance} = useBalance({token: 'BWG', watch: true})
  const {isConnected} = useWalletConnectModal()

  const fullName = React.useMemo(() => {
    if (!user) return
    if (!user.user_detail) return
    if (user.user_detail.first_name && user.user_detail.last_name)
      return user.user_detail.first_name + ' ' + user.user_detail.last_name
    return user.user_detail.first_name || user.user_detail.last_name
  }, [user])

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={{flex: 1}}>
        <DrawerContentScrollView contentContainerStyle={{paddingTop: 0}} {...props}>
          <LinearGradient
            style={styles.header}
            colors={[theme.colors.tertiary, theme.colors.tertiaryDark]}
          >
            <Logo height={80} width={80} />
            <Text style={styles.title}>{fullName ?? ''}</Text>
            {isConnected && (
              <Text style={styles.subTitle}>{Number(balance?.value.toFixed(3) ?? 0)} BWG</Text>
            )}
          </LinearGradient>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <Divider width={2} style={{marginBottom: 20}} />
        <View style={styles.footer}>
          <View
            style={[
              styles.footerItem,
              {
                columnGap: 0,
                justifyContent: 'space-between',
              },
            ]}
          >
            <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
              <Icon name='share' color={theme.colors.tertiary} />
              <Text style={[styles.footerItemText, {color: theme.colors.tertiary}]}>
                Refer a friend
              </Text>
            </View>
            <CopyButton
              style={{marginRight: 10}}
              toCopy={`${APP_URL}/invite?token=${profile?.referral_token}`}
              size='sm'
              enterIconColor='grey2'
            />
          </View>
          {/* <ZenDesk
            textStyle={[styles.footerItemText, {color: theme.colors.tertiary}]}
            style={[styles.footerItem]}
            iconStyles={{color: theme.colors.tertiary}}
          /> */}
          <TouchableOpacity
            style={[
              styles.footerItem,
              {
                padding: 5,
                backgroundColor: alpha(theme.colors.error, 0.1),
                marginBottom: bottomInset ? 0 : 10,
              },
            ]}
            onPress={() => onUnauthorized()}
            activeOpacity={0.8}
          >
            <Icon name='logout' color={theme.colors.error} />
            <Text style={[styles.footerItemText, {color: theme.colors.error}]}>Logout</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 10,
    rowGap: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    paddingStart: 15,
    borderRadius: 5,
  },
  footerItemText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
}))

export default DrawerContainer
