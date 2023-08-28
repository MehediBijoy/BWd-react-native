import React from 'react'
import * as yup from 'yup'
import {Button, Text} from '@rneui/themed'
import {useMutation} from '@tanstack/react-query'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {ScrollView, TouchableOpacity, View} from 'react-native'

import Form from 'components/Form'
import FormInput from 'components/FormInput'
import useApi from 'hooks/api/useApi'
import FAQ from 'screens/auth/FAQ/FAQ'
import {useAuthToken} from 'hooks/api'
import {useProfile} from 'hooks/helper'
import SafeAreaView from 'components/SafeAreaView'
import useYupHooks from 'hooks/helper/useYupHooks'
import {RouteStack} from 'navigators/routes'
import ContainContainer from 'components/ContentContainer'

import GradientBox from '../GradientBox'

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

  const {mutate, isLoading} = useMutation({
    mutationFn: api.login,
    onSuccess: ({token, user}) => {
      setToken(token)
      setProfile(user)
    },
    onError: console.error,
  })

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

                <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                  <Text style={styles.forgotPasswordStyles}>Forgot Password?</Text>
                </TouchableOpacity>
                <Button
                  title='Login'
                  loading={isLoading}
                  onPress={methods.handleSubmit(data => mutate(data))}
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
