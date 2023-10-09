import * as yup from 'yup'
import React, {useState} from 'react'
import {Button, Text} from '@rneui/themed'
import {useMutation} from '@tanstack/react-query'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {ScrollView, TouchableOpacity, View} from 'react-native'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import ContainContainer from '@core/ContentContainer'

import {isMfaRequired} from 'utils/response'
import useApi from 'hooks/api/useApi'
import {ErrorObject} from 'api/Errors'
import FAQ from 'screens/auth/FAQ/FAQ'
import {useAuthToken} from 'hooks/api'
import {LoginProps} from 'api/Request'
import {useProfile} from 'hooks/helper'
import {LoginResponse} from 'api/Response'
import {RouteStack} from 'navigators/routes'
import useYupHooks from 'hooks/helper/useYupHooks'

import GradientBox from '../GradientBox'
import {useStyles} from './Login.styles'
import TwoFactorModal from '../TwoFactorModal'
import PlatformSelect from './PlatformSelect'

const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
})

type LoginFields = yup.InferType<typeof loginSchema>

const Login = ({navigation}: NativeStackScreenProps<RouteStack, 'Login'>) => {
  const api = useApi()
  const styles = useStyles()
  const {setProfile} = useProfile()
  const {setToken} = useAuthToken()
  const {methods} = useYupHooks<LoginFields>({schema: loginSchema})

  const [isOpened, setIsOpened] = useState<boolean>(false)

  const {mutate, isLoading, isError, error, reset} = useMutation<
    LoginResponse,
    ErrorObject,
    LoginProps
  >({
    mutationFn: api.login,
    onSuccess: ({token, user}: LoginResponse) => {
      setToken(token)
      setProfile(user)
    },
    onError: error => {
      if (isMfaRequired(error)) {
        reset()
        setIsOpened(true)
      }
    },
  })

  const onSubmit = (data: any) => {
    mutate({...methods.getValues(), ...data})
  }

  const onCloseModal = () => {
    reset()
    setIsOpened(false)
  }

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
              <TwoFactorModal
                isOpened={isOpened}
                onClose={onCloseModal}
                onSubmit={onSubmit}
                isLoading={isLoading}
                error={error}
              />

              <FormInput
                name='email'
                placeholder='Email'
                label='Enter your Email'
                color='bgPaper'
              />

              <FormInput
                name='password'
                type='password'
                placeholder='Password'
                label='Enter your Password'
                color='bgPaper'
              />

              {isError && !isOpened && <Text style={styles.error}> {error.message}</Text>}

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
