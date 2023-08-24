import {View} from 'react-native'
import {Button, Text} from '@rneui/themed'

import {useOnUnauthorized} from 'hooks/api'
import {useProfile} from 'hooks/helper'

const Dashboard = () => {
  const unAuthorized = useOnUnauthorized()
  const {profile} = useProfile()
  return (
    <View>
      <Text h1>{profile?.email}</Text>
      <Button title='logout' onPress={() => unAuthorized()} />
    </View>
  )
}

export default Dashboard
