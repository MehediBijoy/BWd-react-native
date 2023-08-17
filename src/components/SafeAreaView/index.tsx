import {View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

const SafeAreaView = ({children}: {children: JSX.Element}) => {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {children}
    </View>
  )
}

export default SafeAreaView
