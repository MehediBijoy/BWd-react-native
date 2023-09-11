import {Icon, Text} from '@rneui/themed'
import {View, ActivityIndicator} from 'react-native'
import {WebView} from 'react-native-webview'

type PaypalViewProps = {
  data: {
    id: number
    external_id: string
    status: string
    links: string[]
  }
  isLoading: boolean
  onClose(): void
}

const PaypalView = ({data, isLoading, onClose}: PaypalViewProps) => (
  <View style={{flex: 1}}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 20,
      }}
    >
      <Icon
        name='close'
        onPress={onClose}
        style={{
          backgroundColor: '#bebebe',
          height: 30,
          width: 30,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </View>
    {isLoading ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator style={{marginBottom: 10}} size='large' />
        <Text>Please wait until content loaded</Text>
      </View>
    ) : (
      <WebView
        originWhitelist={['*']}
        style={{flex: 1}}
        source={{uri: 'https://www.sandbox.paypal.com/checkoutnow?token=' + data.external_id}}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState={false}
        onNavigationStateChange={console.log}
      />
    )}
  </View>
)

export default PaypalView
