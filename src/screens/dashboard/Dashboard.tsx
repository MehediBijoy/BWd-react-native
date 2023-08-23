import {View} from 'react-native'
import {Button, Text} from '@rneui/themed'

import {useProfile} from 'hooks/helper'

const Dashboard = () => {
  const {profile} = useProfile()
  return (
    <View>
      <Text h1>{profile?.email}</Text>
      <Button title='logout' />
    </View>
  )
}

export default Dashboard
