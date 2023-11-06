import React from 'react'
import * as yup from 'yup'
import {useTranslation} from 'react-i18next'
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
import {ErrorFields} from 'api/Errors'
import {RouteStack} from 'navigators/routes'
import MessageBox from 'screens/auth/MessageBox'
import useYupHooks from 'hooks/helper/useYupHooks'

import GradientBox from '../GradientBox'
import {useStyles} from './ResetPassword.styles'

const forgetPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
})

type FormFields = yup.InferType<typeof forgetPasswordSchema>

const ForgetPassword = ({
  navigation,
}: NativeStackScreenProps<RouteStack, 'ResetEmailVerification'>) => {
  const api = useApi()
  const {t} = useTranslation()
  const {theme} = useTheme()
  const styles = useStyles()
  const {methods} = useYupHooks<FormFields>({schema: forgetPasswordSchema})
  const {mutate, isLoading, error} = useMutation<Success, ErrorFields, EmailProps>({
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
              {t('forgotPassword.title')}
            </Text>

            <MessageBox
              name='email'
              type='entypo'
              color={theme.colors.white}
              message={t('forgotPassword.subtitle')}
            />

            <Form methods={methods} style={styles.innerContainer}>
              <FormInput
                name='email'
                placeholder={t('profile.appSettings.email')}
                label={t('forms.placeholders.email')}
                color='bgPaper'
              />

              {error && <Text style={styles.error}> {error['email']?.[0] ?? ''}</Text>}

              <Button
                title={t('modal2fa.submit')}
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

export default ForgetPassword
