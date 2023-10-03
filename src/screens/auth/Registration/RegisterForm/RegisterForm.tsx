import React from 'react'
import * as yup from 'yup'
import {ScrollView, Linking} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {Text, Button, makeStyles} from '@rneui/themed'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import FormSelect from '@core/FormSelect'
import FormCheckBox from '@core/FormCheckBox'
import ContainContainer from '@core/ContentContainer'

import FAQ from 'screens/auth/FAQ'
import {useApi, useAuthToken} from 'hooks/api'
import {useProfile, useYupHooks} from 'hooks/helper'

import StepNumber from '../StepNumber'
import GradientBox from '../../GradientBox'
import {earnConfig, experienceConfig, professionConfig, sourceOfIncomeConfig} from './select.config'

const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(30),
  password_confirmation: yup
    .string()
    .required('Confirm Password is required')
    // eslint-disable-next-line quotes
    .oneOf([yup.ref('password')], "Passwords don't match"),
  agree_terms: yup.bool().default(false).oneOf([true], 'The terms and conditions must be accepted'),
  referral_checkbox: yup.bool().default(false),
  token: yup.string().when('referral_checkbox', {
    is: true,
    then: () => yup.string().transform(() => undefined),
    otherwise: () => yup.string().min(6).max(6).required(),
  }),
  profession: yup.string().required('Profession is required'),
  source_of_income: yup.string().required('Source of earning is required'),
  earnings: yup.string(),
  trading_experience: yup.string(),
})

type RegisterFields = yup.InferType<typeof registerSchema>

const RegisterForm = () => {
  const api = useApi()
  const styles = useStyles()
  const {setProfile} = useProfile()
  const {setToken} = useAuthToken()
  const {methods, setApiError} = useYupHooks<RegisterFields>({schema: registerSchema})

  const {mutate} = useMutation({
    mutationFn: ({
      email,
      password,
      password_confirmation,
      token,
      profession,
      source_of_income,
      earnings,
      trading_experience,
    }: RegisterFields) =>
      api.signUpInitial({
        email,
        password,
        password_confirmation,
        token,
        user_detail_attributes: {
          profession,
          source_of_income,
          earnings,
          trading_experience,
        },
      }),
    onSuccess: ({token, user}) => {
      setToken(token)
      setProfile(user)
    },
    onError: setApiError,
  })

  const isChecked = methods.watch('referral_checkbox')

  return (
    <ScrollView>
      <ContainContainer>
        <StepNumber current={1} />
        <GradientBox>
          <Text h4 h4Style={{color: 'white'}}>
            Registration
          </Text>
          <Form methods={methods} style={styles.form}>
            <FormInput name='email' label='Email' placeholder='Enter your email' color='bgPaper' />

            <FormInput
              name='password'
              type='password'
              label='Password'
              placeholder='Enter your password'
              color='bgPaper'
            />

            <FormInput
              type='password'
              name='password_confirmation'
              label='Confirm Password'
              placeholder='Confirm your password'
              color='bgPaper'
            />

            <FormSelect
              name='profession'
              label='What is your profession?'
              data={professionConfig}
              color='bgPaper'
            />

            <FormSelect
              name='source_of_income'
              label='Source of income'
              data={sourceOfIncomeConfig}
              color='bgPaper'
            />

            <FormSelect
              name='earnings'
              label='How much do you earn?'
              data={earnConfig}
              color='bgPaper'
            />

            <FormSelect
              name='trading_experience'
              label='How much experience do you have with treading?'
              data={experienceConfig}
              color='bgPaper'
            />

            {!isChecked && (
              <FormInput
                name='token'
                label='Referral Code'
                placeholder='Enter your referral code'
                color='bgPaper'
              />
            )}

            <FormCheckBox
              name='referral_checkbox'
              label='Sign up without a referral code'
              labelColor='bgPaper'
            />

            <FormCheckBox
              name='agree_terms'
              label={
                <Text style={styles.checkboxTitle}>
                  By signing up you agree to our
                  <Text
                    style={styles.link}
                    onPress={() =>
                      Linking.openURL(
                        'https://app.brettonwoods.us.com/documents/terms_and_conditions.pdf'
                      )
                    }
                  >
                    {' '}
                    Terms & Conditions
                  </Text>
                  <Text
                    style={styles.link}
                    onPress={() =>
                      Linking.openURL(
                        'https://app.brettonwoods.us.com/documents/privacy_statement.pdf'
                      )
                    }
                  >
                    {' '}
                    Privacy Statement
                  </Text>{' '}
                  and
                  <Text
                    style={styles.link}
                    onPress={() =>
                      Linking.openURL(
                        'https://app.brettonwoods.us.com/documents/user_agreement.pdf'
                      )
                    }
                  >
                    {' '}
                    User Agreement
                  </Text>
                </Text>
              }
            />

            <Button
              type='solid'
              color='secondary'
              title='Register Now'
              onPress={methods.handleSubmit(data => mutate(data))}
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
