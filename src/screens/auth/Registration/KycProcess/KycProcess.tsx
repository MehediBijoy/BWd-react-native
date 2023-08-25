import React from 'react'
import {Button, Text} from '@rneui/themed'
import {useQuery} from '@tanstack/react-query'
// eslint-disable-next-line import/default
import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module'

import {useApi} from 'hooks/api'
import {useProfile} from 'hooks/helper'
import ContainContainer from 'components/ContentContainer'

const KycProcess = () => {
  const api = useApi()
  const {profile} = useProfile()
  const {data: accessToken, refetch} = useQuery({
    queryKey: ['sumsub_access_token'],
    queryFn: () => api.getKycAccessToken().then(({result}) => result.token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: profile && profile.kyc_status !== 'approved',
  })

  const launchSNSMobileSDK = () => {
    let snsMobileSDK = SNSMobileSDK.init(accessToken, refetch)
      .withHandlers({
        onStatusChanged: (event: any) => {
          if (event.newStatus === 'Approved') {
            console.log('dsdfsdf')
          }
          console.log(
            '\n\nonStatusChanged: [' + event.prevStatus + '] => [' + event.newStatus + ']'
          )
        },
      })
      .withDebug(true)
      .withLocale('en')
      .build()

    snsMobileSDK.launch()
  }

  return (
    <ContainContainer>
      <Text>Lets get you verified</Text>
      <Button title='called' onPress={launchSNSMobileSDK} />
    </ContainContainer>
  )
}

export default KycProcess
