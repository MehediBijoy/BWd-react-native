import React from 'react'
import {ScrollView, View} from 'react-native'
import {useQuery} from '@tanstack/react-query'
import {useTranslation} from 'react-i18next'
import {Button, Text, makeStyles, Icon} from '@rneui/themed'
// eslint-disable-next-line import/default
import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import ContainContainer from '@core/ContentContainer'

import {useApi} from 'hooks/api'
import FAQ from 'screens/auth/FAQ'
import {useProfile} from 'hooks/helper'
import {ENV} from 'config/environments'
import {RouteStack} from 'navigators/routes'
import GradientBox from 'screens/auth/GradientBox'

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
  const {t} = useTranslation()
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
    <ScrollView>
      <ContainContainer>
        <StepNumber current={3} />
        <GradientBox>
          <View style={[styles.titleWrapper]}>
            <Icon type='simple-line-icon' name='user' color={styles.textColor.color} />
            <Text h3 h3Style={styles.textColor}>
              {t('register.kyc.startVerification')}
            </Text>
          </View>

          <Text style={[styles.textColor, styles.paragraph]}>
            {t('register.kyc.confirmYourIdentity')}
          </Text>

          <Text style={[styles.textColor]}>{t('register.kyc.verificationText')}</Text>
          <Button
            title={t('register.kyc.kycBtn')}
            containerStyle={{marginTop: 20}}
            onPress={launchSNSMobileSDK}
          />
        </GradientBox>
        <FAQ />
      </ContainContainer>
    </ScrollView>
  )
}

const useStyles = makeStyles(({colors}) => ({
  textColor: {
    color: colors.textReverse,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 20,
  },
}))

export default KycProcess
