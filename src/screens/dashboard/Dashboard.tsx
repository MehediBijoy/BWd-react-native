import React from 'react'
import {ScrollView} from 'react-native'

import ContainContainer from '@core/ContentContainer'

import BalanceBox from './balanceBox'
import ChartBox from './ChartBox'
import FAQ from './FAQ'

const Dashboard = () => {
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
