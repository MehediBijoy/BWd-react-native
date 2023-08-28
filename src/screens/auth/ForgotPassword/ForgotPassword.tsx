import React from 'react'
import * as yup from 'yup'
import {ScrollView, View} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {useMutation} from '@tanstack/react-query'
import {Button, Text} from '@rneui/themed'

import Form from 'components/Form'
import Input from 'components/Input'
import SafeAreaView from 'components/SafeAreaView'
import useApi from 'hooks/api/useApi'
import useYupHooks from 'hooks/helper/useYupHooks'
import ContainContainer from 'components/ContentContainer'
import MessageBox from 'screens/auth/MessageBox'
import FAQ from 'screens/auth/FAQ/FAQ'
import {RouteStack} from 'navigators/routes'

import GradientBox from '../GradientBox'

import {useStyles} from './ForgotPassword.styles'

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
})

type FormFields = yup.InferType<typeof forgotPasswordSchema>

const ForgotPassword = ({navigation}: NativeStackScreenProps<RouteStack, 'ForgetPassword'>) => {
  const api = useApi()
  const styles = useStyles()
  const methods = useYupHooks<FormFields>({schema: forgotPasswordSchema})
  const {mutate, isLoading} = useMutation({
    mutationFn: api.passwordResetRequest,
    onSuccess: () => {
      navigation.navigate('EmailConfirmation')
    },
    onError: () => {
      //TODO! will remove navigation after test
      navigation.navigate('EmailConfirmation')
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
                color='#fff'
                message='Please write down the email you used for registration with BWG and we will send a recovery link to it'
              />
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
          </GradientBox>
          <FAQ />
        </ContainContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ForgotPassword
