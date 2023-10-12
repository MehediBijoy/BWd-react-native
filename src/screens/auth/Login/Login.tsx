import * as yup from 'yup'
import React from 'react'
import {Button, Text} from '@rneui/themed'
import {useMutation} from '@tanstack/react-query'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {ScrollView, TouchableOpacity, View} from 'react-native'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import ContainContainer from '@core/ContentContainer'

import useApi from 'hooks/api/useApi'
import {ErrorObject} from 'api/Errors'
import FAQ from 'screens/auth/FAQ/FAQ'
import {useAuthToken} from 'hooks/api'
import {LoginProps} from 'api/Request'
import {useProfile} from 'hooks/helper'
import {LoginResponse} from 'api/Response'
import {RouteStack} from 'navigators/routes'
import {isMfaRequired} from 'utils/response'
import useYupHooks from 'hooks/helper/useYupHooks'

import GradientBox from '../GradientBox'
import {useStyles} from './Login.styles'
import PlatformSelect from './PlatformSelect'

const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
  mfa_required: yup.boolean().default(false),
  mfa_code: yup.string().when('mfa_required', {
    is: true,
    then: () =>
      yup
        .string()
        .max(6, 'Is too long, max length is 6')
        .min(6, 'Is too short, min length is 6')
        .required('2FA code is required'),
    otherwise: () => yup.string().transform(() => undefined),
  }),
})

type LoginFields = yup.InferType<typeof loginSchema>

const Login = ({navigation}: NativeStackScreenProps<RouteStack, 'Login'>) => {
  const api = useApi()
  const styles = useStyles()
  const {setProfile} = useProfile()
  const {setToken} = useAuthToken()
  const {methods} = useYupHooks<LoginFields>({schema: loginSchema})

  const {mutate, isLoading, isError, error} = useMutation<LoginResponse, ErrorObject, LoginProps>({
    mutationFn: api.login,
    onSuccess: ({token, user}: LoginResponse) => {
      setToken(token)
      setProfile(user)
    },
    onError: error => {
      if (isMfaRequired(error)) {
        methods.setValue('mfa_required', true)
        if (methods.formState.dirtyFields.mfa_code) {
          methods.setError('mfa_code', {
            type: 'required',
            message: error.message,
          })
        }
      }
    },
  })

  const onSubmit = (data: LoginFields) => mutate(data)

  const mfaRequired = methods.watch('mfa_required')

  return (
    <ScrollView>
      <ContainContainer>
        <PlatformSelect />
        <GradientBox style={{marginTop: 30}}>
          <View style={{rowGap: 10}}>
            <Text h3 h3Style={styles.headerTextStyles}>
              Login
            </Text>

            <Form methods={methods} style={{rowGap: 10}}>
              <FormInput
                name='email'
                placeholder='Email'
                label='Enter your Email'
                color='bgPaper'
                onChange={() => {
                  if (!mfaRequired) return
                  methods.resetField('mfa_code')
                  methods.setValue('mfa_required', false)
                }}
              />

              <FormInput
                name='password'
                type='password'
                placeholder='Password'
                label='Enter your Password'
                color='bgPaper'
              />

              {mfaRequired && (
                <FormInput
                  name='mfa_code'
                  placeholder='Password'
                  label='Enter 2FA code'
                  color='bgPaper'
                />
              )}

              {isError && !isMfaRequired(error) && (
                <Text style={styles.error}> {error.message}</Text>
              )}

              <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                <Text style={styles.forgotPasswordStyles}>Forgot Password?</Text>
              </TouchableOpacity>

              <Button title='Login' loading={isLoading} onPress={methods.handleSubmit(onSubmit)} />

              <Button
                color={'secondary'}
                title='Registration'
                onPress={() => navigation.navigate('RegistrationForm')}
              />
            </Form>
          </View>
        </GradientBox>
        <FAQ />
      </ContainContainer>
    </ScrollView>
  )
}

export default Login
