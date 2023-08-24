import * as yup from 'yup'
import {View, ScrollView} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {Button, Text, useTheme} from '@rneui/themed'
import LinearGradient from 'react-native-linear-gradient'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import Form from 'components/Form'
import Input from 'components/Input'
import useApi from 'hooks/api/useApi'
import SafeAreaView from 'components/SafeAreaView'
import useYupHooks from 'hooks/helper/useYupHooks'
import ContainContainer from 'components/ContentContainer'
import FAQ from 'screens/auth/FAQ/FAQ'

import {useStyles} from './ForgotPassword.styles'

const emailConfirmationSchema = yup.object().shape({
  password: yup.string().required().min(8),
  password_confirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords did not match'),
})

type RouteParams = {
  [key: string]: {
    code: string
  }
}

type FormFields = yup.InferType<typeof emailConfirmationSchema>

const ChangePassword = ({route}: NativeStackScreenProps<RouteParams>) => {
  const {code} = route.params

  const api = useApi()
  const {theme} = useTheme()
  const styles = useStyles()
  const methods = useYupHooks<FormFields>({schema: emailConfirmationSchema})

  const {mutate, isLoading} = useMutation({
    mutationFn: (data: FormFields) => {
      return api.passwordResetConfirm({code, ...data})
    },
    onSuccess: console.log,
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
                Create New Password
              </Text>
              <Text style={styles.infoStyles}>
                Please fill in your new password. For better security we recommended following:
              </Text>
              <Form methods={methods} style={styles.innerContainer}>
                <Input
                  name='password'
                  type='password'
                  placeholder='New Password'
                  label='Enter New Password'
                  labelProps={{style: styles.inputLabelProps}}
                />

                <Input
                  name='password_confirmation'
                  type='password'
                  placeholder='Confirm New Password'
                  label='Confirm New Password'
                  labelProps={{style: styles.inputLabelProps}}
                />
                <Button
                  title='Submit'
                  loading={isLoading}
                  onPress={methods.handleSubmit(data => mutate(data))}
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

export default ChangePassword
