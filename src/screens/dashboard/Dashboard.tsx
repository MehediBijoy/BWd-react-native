import React from 'react'
import {ScrollView} from 'react-native'

import Switch from '@core/Switch'
import ContainContainer from '@core/ContentContainer'

import {useSocket} from 'hooks/helper'

import BalanceBox from './balanceBox'

const Dashboard = () => {
  const {subscribe} = useSocket()

  React.useEffect(() => {
    subscribe('NotificationsChannel', {
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
    <ScrollView>
      <ContainContainer>
        <BalanceBox />
        <Switch />
      </ContainContainer>
    </ScrollView>
  )
}

export default Dashboard
