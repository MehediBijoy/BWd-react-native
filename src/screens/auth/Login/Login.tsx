import React from 'react'
import * as yup from 'yup'
import {TouchableOpacity, View} from 'react-native'
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
import routes from 'Navigators/routes'

import {useStyles} from './Login.styles'

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required('password required'),
})

const Login = ({navigation}: any) => {
  const api = useApi()
  const {theme} = useTheme()
  const styles = useStyles()
  const methods = useYupHooks({schema: loginSchema})
  const {setToken} = useAuthToken()

  const {mutate, isLoading} = useMutation({
    mutationFn: api.login,
    onSuccess: ({token}) => {
      setToken(token)
    },
    onError: console.error,
  })

  const onSubmit = (data: any) => mutate(data)

  return (
    <SafeAreaView>
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

              <TouchableOpacity onPress={() => navigation.navigate(routes.auth.resetPassword.path)}>
                <Text style={styles.forgotPasswordStyles}>Forgot Password?</Text>
              </TouchableOpacity>
              <Button title='Login' loading={isLoading} onPress={methods.handleSubmit(onSubmit)} />
            </Form>
          </View>
        </LinearGradient>
      </ContainContainer>
    </SafeAreaView>
  )
}

export default Login
