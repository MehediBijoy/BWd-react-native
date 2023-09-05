import React from 'react'
import {View} from 'react-native'
import {Button, Text} from '@rneui/themed'
import {ScrollView} from 'react-native'

import {useOnUnauthorized} from 'hooks/api'
import {useProfile, useSocket} from 'hooks/helper'

import BalanceBox from './balanceBox'

const Dashboard = () => {
  const {subscribe} = useSocket()
  const {profile} = useProfile()
  const unAuthorized = useOnUnauthorized()

  React.useEffect(() => {
    subscribe('NotificationsChannel', {
      received(data) {
        console.log(data)

        console.log(data.event)
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
    <ScrollView>
      <View>
        <BalanceBox />
        <Text h1>{profile?.email}</Text>
        <Button title='logout' onPress={() => unAuthorized()} />
      </View>
    </ScrollView>
  )
}

export default Dashboard
