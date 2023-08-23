import React from 'react'
import * as yup from 'yup'
import {View} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import LinearGradient from 'react-native-linear-gradient'
import {Button, Text, useTheme} from '@rneui/themed'

import Form from 'components/Form'
import Input from 'components/Input'
import SafeAreaView from 'components/SafeAreaView'
import useApi from 'hooks/api/useApi'
import useYupHooks from 'hooks/helper/useYupHooks'
import ContainContainer from 'components/ContentContainer'
import routes from 'Navigators/routes'

import {useStyles} from './ForgotPassword.styles'

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
})

const ForgotPassword = ({navigation}: any) => {
  const api = useApi()
  const {theme} = useTheme()
  const styles = useStyles()
  const methods = useYupHooks({schema: forgotPasswordSchema})
  const {mutate, isLoading} = useMutation({
    mutationFn: api.passwordResetRequest,
    onSuccess: () => {
      navigation.navigate(routes.auth.emailConfirmation.path)
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
              Forgot Password
            </Text>
            <Text style={styles.infoStyles}>
              Please write down the email you used for registration with BWG and we will send a
              recovery link to it.
            </Text>
            <Form methods={methods} style={styles.innerContainer}>
              <Input
                name='email'
                placeholder='Email'
                label='Enter your Email'
                labelProps={{style: styles.inputLabelProps}}
              />
              <Button title='Submit' loading={isLoading} onPress={methods.handleSubmit(onSubmit)} />
            </Form>
          </View>
        </LinearGradient>
      </ContainContainer>
    </SafeAreaView>
  )
}

export default ForgotPassword
