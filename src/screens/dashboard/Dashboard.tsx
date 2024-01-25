import React from 'react'
import {ScrollView} from 'react-native'

import ContainContainer from '@core/ContentContainer'

import useSurvey from 'hooks/states/useSurvey'
import {usePlatform, useProfile} from 'hooks/helper'

import Survey from './Survey'
import BalanceBox from './balanceBox'
import ChartBox from './ChartBox'
import FAQ from './FAQ'

const Dashboard = () => {
  const {profile} = useProfile()
  const {platform} = usePlatform()
  const {hasCompleted} = useSurvey()

  return (
    <ScrollView>
      <ContainContainer>
        {!hasCompleted(profile?.id as number, platform) && <Survey />}
        <BalanceBox />
        <ChartBox />
        <FAQ />
      </ContainContainer>
    </ScrollView>
  )
}

export default Dashboard
