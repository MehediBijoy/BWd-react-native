import React from 'react'
import * as yup from 'yup'
import {ScrollView, Linking} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {useTranslation} from 'react-i18next'
import {Text, Button, makeStyles} from '@rneui/themed'
import {RouteProp, useRoute} from '@react-navigation/native'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import FormSelect from '@core/FormSelect'
import FormCheckBox from '@core/FormCheckBox'
import ContainContainer from '@core/ContentContainer'

import FAQ from 'screens/auth/FAQ'
import {useApi, useAuthToken} from 'hooks/api'
import {useProfile, useYupHooks, usePlatform} from 'hooks/helper'
import {LegalStuff} from 'constants/legalStuff.config'
import {PlatformType} from 'hooks/helper/usePlatform'

import StepNumber from '../StepNumber'
import GradientBox from '../../GradientBox'
import {
  earnConfig,
  experienceConfig,
  professionConfig,
  sourceOfIncomeConfig,
  beneficialOwnerConfig,
} from './select.config'

const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(30),
  password_confirmation: yup
    .string()
    .required('register.signup.restrictions.password.confirmRequired')
    .oneOf([yup.ref('password')], 'register.signup.restrictions.password.notMatch'),
  agree_terms: yup.bool().default(false).oneOf([true], 'register.signup.termsAndConditions'),
  token: yup.string(),
  user_type: yup.string(),
  beneficial: yup
    .string()
    .required('schema.beneficial')
    .oneOf(['yes'], 'register.signup.beneficialError'),
  profession: yup.string().required(),
  source_of_income: yup.string().required('register.signup.restrictions.sourceOfEarning'),
  earnings: yup.string(),
  trading_experience: yup.string(),
})

type RegisterFields = yup.InferType<typeof registerSchema>

type RootStackParamList = {
  RegisterForm: {
    token: string
    platform: PlatformType
    user?: string
  }
}

const RegisterForm = () => {
  const api = useApi()
  const styles = useStyles()
  const {t} = useTranslation()
  const {setProfile} = useProfile()
  const {setToken} = useAuthToken()
  const {switchPlatform} = usePlatform()
  const {methods, setApiError} = useYupHooks<RegisterFields>({schema: registerSchema})
  const route = useRoute<RouteProp<RootStackParamList, 'RegisterForm'>>()

  const {token, platform, user} = route.params || {}

  const referralMutation = useMutation({mutationFn: api.checkReferral})

  React.useEffect(() => {
    if (platform && ['EU', 'US'].includes(platform as PlatformType)) {
      switchPlatform(platform)
    }
    if (token) referralMutation.mutate({token: token})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform, switchPlatform, token])

  const {mutate} = useMutation({
    mutationFn: ({
      email,
      password,
      password_confirmation,
      profession,
      source_of_income,
      earnings,
      trading_experience,
      token,
      user_type,
    }: RegisterFields) =>
      api.signUpInitial({
        email,
        password,
        password_confirmation,
        token,
        user_type,
        user_detail_attributes: {
          profession,
          source_of_income,
          earnings,
          trading_experience,
        },
      }),
    onSuccess: ({token, user}) => {
      setProfile(user)
      user && setToken(token)
    },
    onError: setApiError,
  })

  return (
    <ScrollView>
      <ContainContainer>
        <StepNumber current={1} />
        <GradientBox>
          <Text h4 h4Style={{color: 'white'}}>
            {t('register.titles.signup')}
          </Text>
          <Form methods={methods} style={styles.form}>
            <FormInput
              name='email'
              autoCapitalize='none'
              textContentType='username'
              autoCorrect={false}
              label={t('profile.appSettings.email')}
              placeholder={t('forms.placeholders.email')}
              color='bgPaper'
            />

            <FormInput
              name='password'
              type='password'
              autoCapitalize='none'
              textContentType='newPassword'
              autoCorrect={false}
              label={t('forms.placeholders.password')}
              placeholder={t('profile.appSettings.password')}
              color='bgPaper'
            />

            <FormInput
              type='password'
              name='password_confirmation'
              label={t('forms.labels.confirmPassword')}
              placeholder={t('forms.placeholders.confirmPassword')}
              color='bgPaper'
            />

            <FormSelect
              name='profession'
              placeholder={t('register.signup.select.placeholder')}
              label={t('register.signup.select.profession')}
              data={professionConfig(t)}
              color='bgPaper'
            />

            <FormSelect
              name='source_of_income'
              placeholder={t('register.signup.select.placeholder')}
              label={t('register.signup.select.income')}
              data={sourceOfIncomeConfig(t)}
              color='bgPaper'
            />

            <FormSelect
              name='earnings'
              placeholder={t('register.signup.select.placeholder')}
              label={t('register.signup.select.earn')}
              data={earnConfig(t)}
              color='bgPaper'
            />

            <FormSelect
              name='trading_experience'
              placeholder={t('register.signup.select.placeholder')}
              label={t('register.signup.select.experience')}
              data={experienceConfig(t)}
              color='bgPaper'
            />

            <FormSelect
              name='beneficial'
              placeholder={t('register.signup.select.placeholder')}
              label={t('register.signup.beneficialText')}
              data={beneficialOwnerConfig(t)}
              color='bgPaper'
            />
            {referralMutation && referralMutation.data && (
              <Text style={styles.link}>
                {t('register.signup.referral.found')} ({referralMutation.data?.name})
              </Text>
            )}

            <FormCheckBox
              name='agree_terms'
              label={
                <Text style={styles.checkboxTitle}>
                  {t('forms.checkboxes.agreeTerms')}
                  <Text
                    style={styles.link}
                    onPress={() => Linking.openURL(LegalStuff.termAndConditions)}
                  >
                    {' '}
                    {t('documents.termsAndConditions.title')}
                  </Text>
                  <Text
                    style={styles.link}
                    onPress={() => Linking.openURL(LegalStuff.privacyStatement)}
                  >
                    {' '}
                    {t('documents.privacyPolicy.title')}
                  </Text>{' '}
                  {t('common.and')}
                  <Text
                    style={styles.link}
                    onPress={() => Linking.openURL(LegalStuff.userAgreement)}
                  >
                    {' '}
                    {t('documents.userAgreement.title')}
                  </Text>
                </Text>
              }
            />

            <Button
              type='solid'
              color='secondary'
              title={t('register.titles.signup')}
              onPress={methods.handleSubmit(data =>
                mutate({...data, token: token, user_type: user})
              )}
            />
          </Form>
        </GradientBox>
        <FAQ />
      </ContainContainer>
    </ScrollView>
  )
}

const useStyles = makeStyles(({colors}) => ({
  form: {
    marginTop: 20,
    display: 'flex',
    rowGap: 15,
  },
  checkboxTitle: {
    color: colors.textReverse,
    marginStart: 10,
  },
  link: {
    color: colors.primary,
  },
}))

export default RegisterForm
