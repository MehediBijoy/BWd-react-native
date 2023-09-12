import {useEffect} from 'react'
import {Text} from '@rneui/themed'
import {View} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {RouteStack} from 'navigators/routes'

const ChangePassword = ({navigation}: NativeStackScreenProps<RouteStack>) => {
  const parent = navigation.getParent()

  useEffect(() => {
    parent?.setOptions({
      headerShown: false,
    })
    return () => {
      parent?.setOptions({
        headerShown: true,
      })
    }
  }, [parent])

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text>Email Password</Text>
    </View>
  )
}

export default ChangePassword
