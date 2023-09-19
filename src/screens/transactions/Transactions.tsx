import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text} from '@rneui/themed'

import ContainContainer from '@core/ContentContainer'

import TransactionsHistory from './TransactionsHistory'

const Transactions = () => {
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
