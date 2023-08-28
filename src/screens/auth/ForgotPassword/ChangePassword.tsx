import * as yup from 'yup'
import {View, ScrollView} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {Button, Text} from '@rneui/themed'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import Form from 'components/Form'
import Input from 'components/Input'
import useApi from 'hooks/api/useApi'
import SafeAreaView from 'components/SafeAreaView'
import useYupHooks from 'hooks/helper/useYupHooks'
import ContainContainer from 'components/ContentContainer'
import FAQ from 'screens/auth/FAQ/FAQ'

import GradientBox from '../GradientBox'
import MessageBox from '../MessageBox'
import ListBox from '../ListBox/ListBox'

import {useStyles} from './ForgotPassword.styles'

const emailConfirmationSchema = yup.object().shape({
  password: yup.string().required().min(8),
  password_confirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords did not match'),
})

type RootProps = {
  Home: undefined
  Login: undefined
  ChangePassword: {code: string}
}

type FormFields = yup.InferType<typeof emailConfirmationSchema>

const ChangePassword = ({route}: NativeStackScreenProps<RootProps, 'ChangePassword'>) => {
  const {code} = route.params

  const api = useApi()

  const styles = useStyles()
  const methods = useYupHooks<FormFields>({schema: emailConfirmationSchema})

  const {mutate, isLoading} = useMutation({
    mutationFn: (data: FormFields) => {
      return api.passwordResetConfirm({code, ...data})
    },
    onSuccess: console.log,
    onError: console.error,
  })
  const data = [
    'At least 12 characters - the more characters, the better',
    'A mixture of both uppercase and lowercase letters',
    'A mixture of letters and numbers',
    'Inclusion of at least one special character: , ! @ # ? ]',
  ]

  return (
    <SafeAreaView>
      <ScrollView>
        <ContainContainer>
          <GradientBox styles={{marginTop: 30}}>
            <View style={{rowGap: 20}}>
              <Text h3 h3Style={styles.headerTextStyles}>
                Create New Password
              </Text>

              <MessageBox
                name='lock-reset'
                type='material-community'
                color='#fff'
                message='Please fill in your new password. For better security we recommended following:'
              />
              <ListBox data={data} />
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
          </GradientBox>
          <FAQ />
        </ContainContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChangePassword
