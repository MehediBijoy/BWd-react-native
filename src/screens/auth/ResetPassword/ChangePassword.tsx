import * as yup from 'yup'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
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
    .oneOf([yup.ref('password')], 'register.signup.restrictions.password.notMatch'),
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
  const {t} = useTranslation()

  const [isOpened, setOpened] = useState<boolean>(false)

  const styles = useStyles()
  const {methods} = useYupHooks<FormFields>({schema: emailConfirmationSchema})

  const {mutate, isLoading, isError, error} = useMutation<
    unknown,
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
    t('createNewPassword.list1'),
    t('createNewPassword.list2'),
    t('createNewPassword.list3'),
    `${t('createNewPassword.list4')} , ! @ # ? ]`,
  ]

  return (
    <ScrollView>
      <ContainContainer>
        <GradientBox style={{marginTop: 30}}>
          <View style={{rowGap: 20}}>
            <Text h3 h3Style={styles.headerTextStyles}>
              {t('createNewPassword.title')}
            </Text>

            <MessageBox
              name='lock-reset'
              type='material-community'
              color={theme.colors.white}
              message={t('createNewPassword.subtitle1')}
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
                placeholder={t('forms.labels.newPassword')}
                label={t('forms.placeholders.newPassword')}
                color='bgPaper'
              />

              <FormInput
                name='password_confirmation'
                type='password'
                placeholder={t('forms.labels.confirmPassword')}
                label={t('forms.placeholders.confirmPassword')}
                color='bgPaper'
              />

              {isError && <Text style={styles.error}> {error.message}</Text>}

              <Button
                title={t('modal2fa.submit')}
                loading={isLoading}
                onPress={methods.handleSubmit(data => mutate(data))}
              />
            </Form>
          </View>

          <Modal
            title={t('modals.passwordChanged.title')}
            isOpened={isOpened}
            onClose={afterSuccess}
          >
            <View style={{alignItems: 'flex-start', rowGap: 15}}>
              <Text style={{fontSize: 16}}>{t('modals.passwordChanged.description')}</Text>
              <Button
                title={t('dashboard.purchaseConfirmModal.ok')}
                size='sm'
                containerStyle={{width: 100}}
                onPress={afterSuccess}
              />
            </View>
          </Modal>
        </GradientBox>
        <FAQ />
      </ContainContainer>
    </ScrollView>
  )
}

export default ChangePassword
