import {useState} from 'react'
import {Icon, Text, makeStyles, Button} from '@rneui/themed'
import {View} from 'react-native'
import {WebView} from 'react-native-webview'
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import {useNavigation} from '@react-navigation/native'

import {RouteStack} from 'navigators/routes'

type PaypalViewProps = {
  data: {
    id: number
    external_id: string
    status: string
    links: string[]
  }
  onClose(): void
}

const PaypalView = ({data, onClose}: PaypalViewProps) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const navigation = useNavigation<BottomTabNavigationProp<RouteStack, 'Purchase'>>()

  const styles = useStyles()

  return (
    <View style={{flex: 1}}>
      <View style={styles.iconWrapper}>
        <Icon name='close' onPress={onClose} style={styles.icon} />
      </View>

      {!isSuccess ? (
        <WebView
          originWhitelist={['*']}
          style={{flex: 1}}
          source={{uri: 'https://www.sandbox.paypal.com/checkoutnow?token=' + data.external_id}}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          onNavigationStateChange={data => {
            if (data.url.includes('https://www.brettonwoods.gold/')) {
              setIsSuccess(true)
            }
          }}
        />
      ) : (
        <View style={styles.successfulContainer}>
          <Icon name='check-circle' type='feather' size={80} color={styles.warnIcon.color} />
          <Text style={styles.successText}>Thanks!! Your payment is successful.</Text>
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
