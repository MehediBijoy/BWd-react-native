import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text} from '@rneui/themed'

import ContainContainer from '@core/ContentContainer'

import {useSocket} from 'hooks/helper'

import TransactionsHistory from './TransactionsHistory'

const Transactions = () => {
  const {subscribe} = useSocket()
  React.useEffect(() => {
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
        <View style={{marginTop: 20}}>
          <Text h4>Transactions</Text>
          <TransactionsHistory />
        </View>
      </ContainContainer>
    </ScrollView>
  )
}

export default Transactions
