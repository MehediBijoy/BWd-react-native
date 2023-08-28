import React from 'react'
import {ScrollView} from 'react-native'
import {useQuery} from '@tanstack/react-query'
import {Button, Text, makeStyles} from '@rneui/themed'
// eslint-disable-next-line import/default
import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {useApi} from 'hooks/api'
import FAQ from 'screens/auth/FAQ'
import {useProfile} from 'hooks/helper'
import {ENV} from 'config/environments'
import {RouteStack} from 'navigators/routes'
import GradientBox from 'screens/auth/GradientBox'
import SafeAreaView from 'components/SafeAreaView/SafeAreaView'
import ContainContainer from 'components/ContentContainer'

import StepNumber from '../StepNumber'

type StatusTypes =
  | 'Ready'
  | 'Failed'
  | 'Initial'
  | 'Incomplete'
  | 'Pending'
  | 'TemporarilyDeclined'
  | 'FinallyRejected'
  | 'Approved'
  | 'ActionCompleted'

type StatusProps = {
  prevStatus: StatusTypes
  newStatus: StatusTypes
}

const KycProcess = ({navigation}: NativeStackScreenProps<RouteStack>) => {
  const api = useApi()
  const styles = useStyles()
  const {profile} = useProfile()
  const {data: accessToken, refetch} = useQuery({
    queryKey: ['sumsub_access_token'],
    queryFn: () => api.getKycAccessToken().then(({result}) => result.token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: profile && profile.kyc_status !== 'approved',
  })

  const launchSNSMobileSDK = async () => {
    let snsMobileSDK = SNSMobileSDK.init(accessToken, refetch)
      .withHandlers({
        onStatusChanged: (event: StatusProps) => {
          if (event.newStatus === 'Approved' || event.newStatus === 'ActionCompleted') {
            navigation.replace('RegistrationSuccess')
          }
        },
      })
      .withDebug(ENV === 'dev')
      .withLocale('en')
      .build()

    await snsMobileSDK.launch()
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <ContainContainer>
          <StepNumber current={3} />
          <GradientBox>
            <Text h3 h3Style={styles.textColor}>
              Lets get you verified
            </Text>
            <Text style={[styles.textColor, styles.paragraph]}>
              Before using the platform you need to confirm your identity. Click on the start
              verification button to activate your account.
            </Text>
            <Button
              title='Start Verification'
              containerStyle={{maxWidth: 150}}
              onPress={launchSNSMobileSDK}
            />
          </GradientBox>
          <FAQ />
        </ContainContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

const useStyles = makeStyles(({colors}) => ({
  textColor: {
    color: colors.textReverse,
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 20,
  },
}))

export default KycProcess
