import React from 'react'
import * as yup from 'yup'
import {ScrollView} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {Text, Button, makeStyles} from '@rneui/themed'

import Form from 'components/Form'
import Input from 'components/Input'
import {useApi, useAuthToken} from 'hooks/api'
import FormSelect from 'components/FormSelect'
import FormCheckBox from 'components/FormCheckBox'
import SafeAreaView from 'components/SafeAreaView'
import {useProfile, useYupHooks} from 'hooks/helper'

import Box from '../Box'

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
  const methods = useYupHooks<RegisterFields>({schema: registerSchema})

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
    onError: console.log,
  })

  const isChecked = methods.watch('referral_checkbox')

  return (
    <SafeAreaView>
      <ScrollView>
        <Box gradient>
          <Text h4 h4Style={{color: 'white'}}>
            Registration
          </Text>
          <Form methods={methods} style={styles.form}>
            <Input
              name='email'
              label='Email'
              placeholder='Enter your email'
              labelProps={{style: styles.inputLabel}}
            />

            <Input
              name='password'
              label='Password'
              placeholder='Enter your password'
              labelProps={{style: styles.inputLabel}}
            />

            <Input
              name='password_confirmation'
              label='Confirm Password'
              placeholder='Confirm your password'
              labelProps={{style: styles.inputLabel}}
            />

            <FormSelect
              name='profession'
              label='What is your profession?'
              data={professionConfig}
              labelColor='bgPaper'
            />

            <FormSelect
              name='source_of_income'
              label='Source of income'
              data={sourceOfIncomeConfig}
              labelColor='bgPaper'
            />

            <FormSelect
              name='earnings'
              label='How much do you earn?'
              data={earnConfig}
              labelColor='bgPaper'
            />

            <FormSelect
              name='trading_experience'
              label='How much experience do you have with treading?'
              data={experienceConfig}
              labelColor='bgPaper'
            />

            {!isChecked && (
              <Input
                name='token'
                label='Referral Code'
                placeholder='Enter your referral code'
                labelProps={{style: styles.inputLabel}}
              />
            )}

            <FormCheckBox
              name='referral_checkbox'
              title='Sign up without a referral code'
              color='bgPaper'
            />

            <FormCheckBox
              name='agree_terms'
              title={
                <Text style={styles.checkboxTitle}>
                  By signing up you agree to our
                  <Text style={styles.link}> Terms & Conditions</Text>
                  <Text style={styles.link}> Privacy Statement</Text> and
                  <Text style={styles.link}> User Agreement</Text>
                </Text>
              }
              color='bgPaper'
            />

            <Button
              type='solid'
              color='secondary'
              title='Register Now'
              onPress={methods.handleSubmit(data => mutate(data))}
            />
          </Form>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

const useStyles = makeStyles(({colors}) => ({
  form: {
    marginTop: 20,
    display: 'flex',
    rowGap: 15,
  },
  inputLabel: {
    color: colors.textReverse,
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
