import React from 'react'
import * as yup from 'yup'
import {ScrollView, View} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {Button, Text, useTheme} from '@rneui/themed'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import ContainContainer from '@core/ContentContainer'

import FAQ from 'screens/auth/FAQ'
import useApi from 'hooks/api/useApi'
import {Success} from 'api/Response'
import {EmailProps} from 'api/Request'
import {ErrorObject} from 'api/Errors'
import {RouteStack} from 'navigators/routes'
import MessageBox from 'screens/auth/MessageBox'
import useYupHooks from 'hooks/helper/useYupHooks'

import GradientBox from '../GradientBox'
import {useStyles} from './ResetPassword.styles'

const emailVerificationSchema = yup.object().shape({
  email: yup.string().email().required(),
})

type FormFields = yup.InferType<typeof emailVerificationSchema>

const EmailVerification = ({
  navigation,
}: NativeStackScreenProps<RouteStack, 'ResetEmailVerification'>) => {
  const api = useApi()
  const {theme} = useTheme()
  const styles = useStyles()
  const {methods} = useYupHooks<FormFields>({schema: emailVerificationSchema})
  const {mutate, isLoading, isError, error} = useMutation<Success, ErrorObject, EmailProps>({
    mutationFn: api.passwordResetRequest,
    onSuccess: () => {
      navigation.navigate('ResetEmailConfirmation')
    },
  })
  return (
    <ScrollView>
      <ContainContainer>
        <GradientBox style={{marginTop: 30}}>
          <View style={{rowGap: 20}}>
            <Text h3 h3Style={styles.headerTextStyles}>
              Forgot Password
            </Text>

            <MessageBox
              name='email'
              type='entypo'
              color={theme.colors.white}
              message='Please write down the email you used for registration with BWG and we will send a recovery link to it'
            />

            <Form methods={methods} style={styles.innerContainer}>
              <FormInput
                name='email'
                placeholder='Email'
                label='Enter your Email'
                color='bgPaper'
              />

              {isError && <Text style={styles.error}> {error.message}</Text>}

              <Button
                title='Submit'
                loading={isLoading}
                onPress={methods.handleSubmit((data: FormFields) => mutate(data))}
              />
            </Form>
          </View>
        </GradientBox>
        <FAQ />
      </ContainContainer>
    </ScrollView>
  )
}

export default EmailVerification
