import * as yup from 'yup'
import {useState} from 'react'
import {View, ScrollView} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {Button, Text, useTheme} from '@rneui/themed'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import Form from '@core/Form'
import Modal from '@core/Modal'
import FormInput from '@core/FormInput'
import ContainContainer from '@core/ContentContainer'

import FAQ from 'screens/auth/FAQ'
import useApi from 'hooks/api/useApi'
import {ErrorObject} from 'api/Errors'
import useYupHooks from 'hooks/helper/useYupHooks'
import {ChangePasswordFormProps} from 'api/Request'

import MessageBox from '../MessageBox'
import GradientBox from '../GradientBox'
import {useStyles} from './ResetPassword.styles'

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

const ChangePassword = ({
  navigation,
  route,
}: NativeStackScreenProps<RootProps, 'ChangePassword'>) => {
  const {code} = route.params

  const api = useApi()
  const {theme} = useTheme()
  const [isOpened, setOpened] = useState<boolean>(false)

  const styles = useStyles()
  const {methods} = useYupHooks<FormFields>({schema: emailConfirmationSchema})

  const {mutate, isLoading, isError, error} = useMutation<
    any,
    ErrorObject,
    ChangePasswordFormProps
  >({
    mutationFn: (data: FormFields) => api.passwordResetConfirm({code, ...data}),
    onSuccess: () => setOpened(true),
  })

  const afterSuccess = () => {
    setOpened(!isOpened)
    navigation.replace('Login')
  }

  const data = [
    'At least 12 characters - the more characters, the better',
    'A mixture of both uppercase and lowercase letters',
    'A mixture of letters and numbers',
    'Inclusion of at least one special character: , ! @ # ? ]',
  ]

  return (
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
              color={theme.colors.white}
              message='Please fill in your new password. For better security we recommended following'
            />

            <View style={{rowGap: 5}}>
              {data.map((value, index) => (
                <Text key={index} style={{color: theme.colors.white}}>
                  {'\u2022 '}
                  {value}
                </Text>
              ))}
            </View>

            <Form methods={methods} style={styles.innerContainer}>
              <FormInput
                name='password'
                type='password'
                placeholder='New Password'
                label='Enter New Password'
                color='bgPaper'
              />

              <FormInput
                name='password_confirmation'
                type='password'
                placeholder='Confirm New Password'
                label='Confirm New Password'
                color='bgPaper'
              />

              {isError && <Text style={styles.error}> {error.message}</Text>}

              <Button
                title='Submit'
                loading={isLoading}
                onPress={methods.handleSubmit(data => mutate(data))}
              />
            </Form>
          </View>

          <Modal title='Password Changed' isOpened={isOpened} onClose={afterSuccess}>
            <View style={{alignItems: 'flex-start', rowGap: 15}}>
              <Text style={{fontSize: 16}}>Your password has been successfully updated.</Text>
              <Button title='Ok' size='sm' containerStyle={{width: 100}} onPress={afterSuccess} />
            </View>
          </Modal>
        </GradientBox>
        <FAQ />
      </ContainContainer>
    </ScrollView>
  )
}

export default ChangePassword
