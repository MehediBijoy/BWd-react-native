import React, {useState} from 'react'
import {View} from 'react-native'
import {WebView} from 'react-native-webview'
import {useNavigation} from '@react-navigation/native'
import {Icon, Text, makeStyles, Button} from '@rneui/themed'
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

import {RouteStack} from 'navigators/routes'

type LinkProps = {
  href: string
  rel: 'self' | 'payer-action'
  method: 'GET' | 'POST'
}

type PaypalViewProps = {
  data: {
    id: number
    external_id: string
    status: string
    links: LinkProps[]
  }
  onClose(): void
}

const PaypalView = ({data, onClose}: PaypalViewProps) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const navigation = useNavigation<BottomTabNavigationProp<RouteStack, 'Purchase'>>()

  const styles = useStyles()

  const paymentUri = React.useMemo<LinkProps | undefined>(
    () =>
      data &&
      data.links &&
      data.links.find(item => item['rel'] === 'payer-action' && item['method'] === 'GET'),
    [data]
  )

  return (
    <View style={{flex: 1}}>
      <View style={styles.iconWrapper}>
        <Icon name='close' onPress={onClose} style={styles.icon} />
      </View>

      {!isSuccess ? (
        paymentUri &&
        paymentUri.href && (
          <WebView
            originWhitelist={['*']}
            style={{flex: 1}}
            source={{uri: paymentUri.href}}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            onNavigationStateChange={data => {
              if (data.url.includes('https://www.brettonwoods.gold/')) {
                setIsSuccess(true)
              }
            }}
          />
          // Todo: we need to handle here for invalid order creation
        )
      ) : (
        <View style={styles.successfulContainer}>
          <Icon name='check-circle' type='feather' size={80} color={styles.warnIcon.color} />
          <Text style={styles.successText}>Thanks! Your payment was successful.</Text>
          <Button
            title='OK'
            onPress={() => {
              navigation.navigate('Transactions')
            }}
            containerStyle={{minWidth: 100}}
          />
        </View>
      )}
    </View>
  )
}

const useStyles = makeStyles(({colors}) => ({
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 20,
  },
  icon: {
    backgroundColor: colors.bgPaper,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successfulContainer: {
    minHeight: '80%',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warnIcon: {
    color: colors.primary,
  },
  successText: {
    color: colors.tertiary,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '700',
  },
}))

export default PaypalView
