import React, {useState} from 'react'
import {View} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {WebView, WebViewNavigation} from 'react-native-webview'
import {useNavigation} from '@react-navigation/native'
import {Icon, Text, makeStyles, Button} from '@rneui/themed'
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

import {Payment} from 'api/Response'
import {RouteStack} from 'navigators/routes'
import {useApi} from 'hooks/api'

type LinkProps = {
  href: string
  rel: 'self' | 'payer-action'
  method: 'GET' | 'POST'
}

type PaypalViewProps = {
  data: Payment
  onClose(): void
}

const PaypalView = ({data, onClose}: PaypalViewProps) => {
  const api = useApi()
  const styles = useStyles()

  const [isSuccess, setIsSuccess] = useState(false)
  const [isCapture, setIsCapture] = useState(true)
  const [isWebView, setIsWebView] = useState(true)

  const navigation = useNavigation<BottomTabNavigationProp<RouteStack, 'Purchase'>>()

  const paymentUri = React.useMemo<LinkProps | undefined>(
    () =>
      data &&
      data.payment_data.links &&
      data.payment_data.links.find(
        item => item['rel'] === 'payer-action' && item['method'] === 'GET'
      ),
    [data]
  )

  const paypalCapture = useMutation({
    mutationFn: api.paypalCapture,
    onSuccess: () => setIsSuccess(true),
  })

  //Todo: we need to make both payment success and error page in landing site
  const onNavigationStateChange = (webViewProgress: WebViewNavigation) => {
    if (webViewProgress.url.includes('https://www.brettonwoods.gold/') && isCapture) {
      setIsWebView(false)
      setIsCapture(false)
      paypalCapture.mutate(data.id)
    }
    if (webViewProgress.url.includes('https://example.com')) {
      setIsWebView(false)
      onClose()
    }
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.iconWrapper}>
        <Icon name='close' onPress={onClose} style={styles.icon} />
      </View>

      {isSuccess && !isWebView && (
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

      {!isSuccess && isWebView && paymentUri && paymentUri.href && (
        <WebView
          originWhitelist={['*']}
          style={{flex: 1}}
          source={{uri: paymentUri.href}}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          onNavigationStateChange={onNavigationStateChange}
        />
        // Todo: we need to handle here for invalid order creation
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
