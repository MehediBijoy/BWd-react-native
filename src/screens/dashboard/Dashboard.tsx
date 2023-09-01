import {View} from 'react-native'
import {Button, Text} from '@rneui/themed'

import {useOnUnauthorized} from 'hooks/api'
import {useProfile} from 'hooks/helper'

import BalanceBox from './balanceBox'

const Dashboard = () => {
  const unAuthorized = useOnUnauthorized()
  const {profile} = useProfile()
  
  return (
    <View>
      <BalanceBox />
      <Text h1>{profile?.email}</Text>
      <Button title='logout' onPress={() => unAuthorized()} />
    </View>
  )
}

export default Dashboard
