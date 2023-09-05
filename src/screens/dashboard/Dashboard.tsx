import React from 'react'
import {ScrollView} from 'react-native'

import SafeAreaView from '@core/SafeAreaView'
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
      <SafeAreaView>
        <ContainContainer>
          <BalanceBox />
        </ContainContainer>
      </SafeAreaView>
    </ScrollView>
  )
}

export default Dashboard
