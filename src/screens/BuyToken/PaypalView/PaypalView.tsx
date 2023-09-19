import {useState} from 'react'
import {Icon, Text, makeStyles} from '@rneui/themed'
import {View} from 'react-native'
import {WebView} from 'react-native-webview'

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
        <Text h4 style={styles.successText}>
          Payment successfully done.
        </Text>
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
  successText: {
    color: colors.primary,
    marginLeft: 10,
  },
}))

export default PaypalView
