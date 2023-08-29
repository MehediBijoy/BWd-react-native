import React from 'react'
import * as yup from 'yup'
import {ScrollView, View} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {useMutation} from '@tanstack/react-query'
import {Button, Text, useTheme} from '@rneui/themed'

import Form from 'components/Form'
import FormInput from 'components/FormInput'
import SafeAreaView from 'components/SafeAreaView'
import useApi from 'hooks/api/useApi'
import useYupHooks from 'hooks/helper/useYupHooks'
import ContainContainer from 'components/ContentContainer'
import MessageBox from 'screens/auth/MessageBox'
import FAQ from 'screens/auth/FAQ/FAQ'
import {RouteStack} from 'navigators/routes'

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
  const {mutate, isLoading} = useMutation({
    mutationFn: api.passwordResetRequest,
    onSuccess: () => {
      navigation.navigate('ResetEmailConfirmation')
    },
    onError: () => {
      //TODO! will remove navigation after test
      navigation.navigate('ResetEmailConfirmation')
    },
  })
  return (
    <SafeAreaView>
      <ScrollView>
        <ContainContainer>
          <GradientBox styles={{marginTop: 30}}>
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
    </SafeAreaView>
  )
}

export default EmailVerification
