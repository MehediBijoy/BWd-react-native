import React from 'react'
import * as yup from 'yup'
import {ScrollView, View} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {useMutation} from '@tanstack/react-query'
import LinearGradient from 'react-native-linear-gradient'
import {Button, Text, useTheme} from '@rneui/themed'

import Form from 'components/Form'
import Input from 'components/Input'
import SafeAreaView from 'components/SafeAreaView'
import useApi from 'hooks/api/useApi'
import useYupHooks from 'hooks/helper/useYupHooks'
import ContainContainer from 'components/ContentContainer'
import FAQ from 'screens/auth/FAQ/FAQ'
import routes from 'navigators/routes'

import {useStyles} from './ForgotPassword.styles'

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
})

type FormFields = yup.InferType<typeof forgotPasswordSchema>

const ForgotPassword = ({navigation}: NativeStackScreenProps<any>) => {
  const api = useApi()
  const {theme} = useTheme()
  const styles = useStyles()
  const methods = useYupHooks<FormFields>({schema: forgotPasswordSchema})
  const {mutate, isLoading} = useMutation({
    mutationFn: api.passwordResetRequest,
    onSuccess: () => {
      navigation.navigate(routes.auth.emailConfirmation.path)
    },
    onError: () => {
      //TODO! will remove navigation after test
      navigation.navigate(routes.auth.emailConfirmation.path)
    },
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
                <Button
                  title='Submit'
                  loading={isLoading}
                  onPress={methods.handleSubmit((data: FormFields) => mutate(data))}
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

export default ForgotPassword
