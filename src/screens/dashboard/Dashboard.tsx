import React from 'react'
import {View} from 'react-native'
import {Button, Text} from '@rneui/themed'

import {useOnUnauthorized} from 'hooks/api'
import {useProfile, useSocket} from 'hooks/helper'

import BalanceBox from './balanceBox'

const Dashboard = () => {
  const {subscribe} = useSocket()
  const {profile} = useProfile()
  const unAuthorized = useOnUnauthorized()

  React.useEffect(() => {
    subscribe('PaymentsChannel', {
      received(data) {
        console.log(data)
      },
      connected() {
        console.log('connected')
      },
      disconnected() {
        console.log('disconnected')
      },
    })
  }, [])

  return (
    <View>
      <BalanceBox />
      <Text h1>{profile?.email}</Text>
      <Button title='logout' onPress={() => unAuthorized()} />
    </View>
  )
}

export default Dashboard
