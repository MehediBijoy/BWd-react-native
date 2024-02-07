import React from 'react'
import {ScrollView, View} from 'react-native'
import {useQuery} from '@tanstack/react-query'

import Loader from '@core/Loader'
import ContainContainer from '@core/ContentContainer'

import {cacheKey} from 'api'
import {useApi} from 'hooks/api'
import {useProfile} from 'hooks/helper'

import Survey from './Survey'
import BalanceBox from './balanceBox'
import ChartBox from './ChartBox'
import FAQ from './FAQ'

const Dashboard = () => {
  const api = useApi()
  const {profile} = useProfile()

  const {data, isLoading, refetch} = useQuery({
    queryKey: [cacheKey.surveyStatus, profile?.id],
    queryFn: () => api.checkSurveyStatus({id: profile?.id as number, event: 'debit_card_survey'}),
    enabled: !!profile?.id,
  })

  return (
    <ScrollView>
      <ContainContainer>
        {isLoading ? (
          <View style={{marginTop: 20}}>
            <Loader />
          </View>
        ) : (
          data?.status !== 'FILLED' && <Survey refetch={refetch} />
        )}
        <BalanceBox />
        <ChartBox />
        <FAQ />
      </ContainContainer>
    </ScrollView>
  )
}

export default Dashboard
