import React from 'react'
import * as yup from 'yup'
import {ScrollView, TouchableOpacity, View} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import LinearGradient from 'react-native-linear-gradient'
import {Button, Text, useTheme} from '@rneui/themed'

import {useAuthToken} from 'hooks/api'
import Form from 'components/Form'
import Input from 'components/Input'
import SafeAreaView from 'components/SafeAreaView'
import ContainContainer from 'components/ContentContainer'
import useYupHooks from 'hooks/helper/useYupHooks'
import useApi from 'hooks/api/useApi'
import routes from 'navigators/routes'
import FAQ from 'screens/auth/FAQ/FAQ'

import {useStyles} from './Login.styles'

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required('password required'),
})

type LoginFields = yup.InferType<typeof loginSchema>

const Login = ({navigation}: any) => {
  const api = useApi()
  const {theme} = useTheme()
  const styles = useStyles()
  const methods = useYupHooks<LoginFields>({schema: loginSchema})
  const {setToken} = useAuthToken()

  const {mutate, isLoading} = useMutation({
    mutationFn: api.login,
    onSuccess: ({token}) => {
      setToken(token)
    },
    onError: console.error,
  })

  return (
    <SafeAreaView>
      <ScrollView>
        <ContainContainer>
          <LinearGradient
            colors={[theme.colors.tertiary, theme.colors.tertiaryDark]}
            style={styles.container}
          >
            <View style={styles.innerContainer}>
              <Text h3 h3Style={styles.headerTextStyles}>
                Login
              </Text>
              <Form methods={methods} style={styles.innerContainer}>
                <Input
                  name='email'
                  placeholder='Email'
                  label='Enter your Email'
                  labelProps={{style: styles.inputLabelProps}}
                />
                <Input
                  name='password'
                  type='password'
                  placeholder='Password'
                  label='Enter your Password'
                  labelProps={{style: styles.inputLabelProps}}
                />

                <TouchableOpacity
                  onPress={() => navigation.navigate(routes.auth.resetPassword.path)}
                >
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
                  onPress={() => navigation.navigate(routes.auth.register.path)}
                />
              </Form>
            </View>
          </LinearGradient>
          <FAQ />
        </ContainContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login
