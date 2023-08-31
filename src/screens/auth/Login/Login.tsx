import React, {useState} from 'react'
import * as yup from 'yup'
import {Button, Text} from '@rneui/themed'
import {useMutation} from '@tanstack/react-query'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {ScrollView, TouchableOpacity, View} from 'react-native'

import Form from 'components/Form'
import {isMfaRequired} from 'utils'
import useApi from 'hooks/api/useApi'
import {ErrorObject} from 'api/Errors'
import FAQ from 'screens/auth/FAQ/FAQ'
import {useAuthToken} from 'hooks/api'
import {LoginProps} from 'api/Request'
import {useProfile} from 'hooks/helper'
import {LoginResponse} from 'api/Response'
import FormInput from 'components/FormInput'
import {RouteStack} from 'navigators/routes'
import SafeAreaView from 'components/SafeAreaView'
import useYupHooks from 'hooks/helper/useYupHooks'
import ContainContainer from 'components/ContentContainer'

import GradientBox from '../GradientBox'
import TwoFactorModal from '../TwoFactorModal'

import {useStyles} from './Login.styles'

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
    <SafeAreaView>
      <ScrollView>
        <ContainContainer>
          <GradientBox styles={{marginTop: 30}}>
            <View style={styles.innerContainer}>
              <Text h3 h3Style={styles.headerTextStyles}>
                Login
              </Text>

              <Form methods={methods} style={styles.innerContainer}>
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

                <Button
                  title='Login'
                  loading={isLoading}
                  onPress={methods.handleSubmit(onSubmit)}
                />

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
    </SafeAreaView>
  )
}

export default Login
