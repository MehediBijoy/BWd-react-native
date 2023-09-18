import React from 'react'
import {ScrollView} from 'react-native'

import ContainContainer from '@core/ContentContainer'

import {useSocket} from 'hooks/helper'

import BalanceBox from './balanceBox'
import ChartBox from './ChartBox'
import FAQ from './FAQ'

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
    subscribe('PaymentsChannel', {
      received(data) {
        console.log('payment channel data: ', data)
      },
      connected() {
        console.log('PaymentsChannel connected')
      },
      disconnected() {
        console.log('PaymentsChannel disconnected')
      },
    })

    subscribe('TransfersChannel', {
      received(data) {
        console.log('transfer channel data:', data)
      },
      connected() {
        console.log('TransfersChannel connected')
      },
      disconnected() {
        console.log('TransfersChannel disconnected')
      },
    })
  }, [])

  return (
    <ScrollView>
      <ContainContainer>
        <BalanceBox />
        <ChartBox />
        <FAQ />
      </ContainContainer>
    </ScrollView>
  )
}

export default Dashboard
