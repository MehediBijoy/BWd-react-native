import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text} from '@rneui/themed'

import ContainContainer from '@core/ContentContainer'

import TransactionBarChart from './StackedBarChart'

const Transactions = () => {
  return (
    <ScrollView>
      <ContainContainer>
        <View>
          <Text h3>Your recent purchases</Text>
          <TransactionBarChart />
        </View>
      </ContainContainer>
    </ScrollView>
  )
}

export default Transactions
