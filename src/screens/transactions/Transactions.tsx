import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text} from '@rneui/themed'

import ContainContainer from '@core/ContentContainer'

import TransactionBarChart from './StackedBarChart'
import TransactionsHistory from './TransactionsHistory'

const Transactions = () => {
  return (
    <ScrollView>
      <ContainContainer>
        <View>
          <Text h3>Your recent purchases</Text>
          <TransactionBarChart />
        </View>

        <View>
          <Text h3>Orders History</Text>
          <TransactionsHistory />
        </View>
      </ContainContainer>
    </ScrollView>
  )
}

export default Transactions
