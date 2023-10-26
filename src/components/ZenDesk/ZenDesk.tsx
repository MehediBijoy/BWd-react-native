import React from 'react'
import {Icon, Text, makeStyles} from '@rneui/themed'
import {initialize, openMessagingView} from 'react-native-zendesk-messaging'
import {TouchableOpacity, Alert, Platform, StyleProp, ViewStyle, TextStyle} from 'react-native'

import {ZENDESK_KEYS} from 'constants/zendesk.config'
import {alpha} from 'utils'

type ZenDeskProps = {
  floating?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  iconStyles?: TextStyle
}

const ZenDesk: React.FC<ZenDeskProps> = ({floating = false, style, textStyle, iconStyles}) => {
  const styles = useStyles()
  const channelKey = React.useMemo(
    () => ZENDESK_KEYS[Platform.OS === 'ios' ? 'ios' : 'android'],
    []
  )

  const runner = async (fn: () => Promise<unknown>) => {
    try {
      await fn()
    } catch (error) {
      Alert.alert((error as Error)?.message ?? 'unknown error')
    }
  }

  React.useEffect(() => {
    runner(() => initialize({channelKey, skipOpenMessaging: true}))
  }, [channelKey])

  const handlePressOpenButton = () => runner(() => openMessagingView())

  return floating ? (
    <TouchableOpacity onPress={handlePressOpenButton} style={styles.btn} activeOpacity={0.8}>
      <Icon name='help' color='white' />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePressOpenButton}
      style={[styles.flattenBtn, style]}
    >
      <Icon name='help-outline' color={iconStyles?.color} style={iconStyles} />
      <Text style={textStyle}>Support</Text>
    </TouchableOpacity>
  )
}

const useStyles = makeStyles(({colors}) => ({
  btn: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: alpha(colors.tertiary, 0.6),
    zIndex: 1,
    padding: 10,
    columnGap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  flattenBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
}))

export default ZenDesk
