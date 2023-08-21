import React from 'react'
import * as yup from 'yup'
import {View} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import LinearGradient from 'react-native-linear-gradient'
import {Button, Text, makeStyles, useTheme} from '@rneui/themed'

import {useAuthToken} from 'hooks/api'
import Form from 'components/Form'
import Input from 'components/Input'
import SafeAreaView from 'components/SafeAreaView'
import ContainContainer from 'components/ContentContainer'
import useYupHooks from 'hooks/helper/useYupHooks'
import useApi from 'hooks/api/useApi'

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 50,
    width: '100%',
    maxWidth: 400,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  innerContainer: {
    display: 'flex',
    rowGap: 10,
  },
}))

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required('password required'),
})

const Login = () => {
  const api = useApi()
  const {theme} = useTheme()
  const styles = useStyles()
  const methods = useYupHooks({schema: loginSchema})
  const {setToken} = useAuthToken()

  const {mutate} = useMutation({
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
            <Text h1 h1Style={{color: theme.colors.white, textAlign: 'center'}}>
              Login
            </Text>
            <Form methods={methods} style={styles.innerContainer}>
              <Input
                name='email'
                placeholder='Email'
                label='Enter your Email'
                labelProps={{style: {color: '#fff'}}}
              />
              <Input
                name='password'
                type='password'
                placeholder='Password'
                label='Enter your Password'
                labelProps={{style: {color: '#fff'}}}
              />
              <Button title='Login' onPress={methods.handleSubmit(onSubmit)} />
            </Form>
          </View>
        </LinearGradient>
      </ContainContainer>
    </SafeAreaView>
  )
}

export default Login
