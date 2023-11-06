import * as yup from 'yup'
import {ScrollView, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {Button, Text, useTheme} from '@rneui/themed'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import ContainContainer from '@core/ContentContainer'

import FAQ from 'screens/auth/FAQ/FAQ'
import {RouteStack} from 'navigators/routes'
import useYupHooks from 'hooks/helper/useYupHooks'

import MessageBox from '../MessageBox'
import GradientBox from '../GradientBox'
import {useStyles} from './ResetPassword.styles'

const emailConfirmationSchema = yup.object().shape({
  code: yup.string().required(),
})

type FormFields = yup.InferType<typeof emailConfirmationSchema>

const EmailConfirmation = ({
  navigation,
}: NativeStackScreenProps<RouteStack, 'ResetEmailConfirmation'>) => {
  const {theme} = useTheme()
  const {t} = useTranslation()
  const styles = useStyles()
  const {methods} = useYupHooks<FormFields>({schema: emailConfirmationSchema})

  const onSubmit = (data: FormFields) => {
    navigation.navigate('ChangePassword', data)
  }

  return (
    <ScrollView>
      <ContainContainer>
        <GradientBox style={{marginTop: 30}}>
          <View style={{rowGap: 20}}>
            <Text h3 h3Style={styles.headerTextStyles}>
              {t('register.emailConfirmation.title')}
            </Text>

            <MessageBox
              name='mail'
              type='entypo'
              color={theme.colors.white}
              message={t('register.emailConfirmation.subTitle')}
            />

            <Form methods={methods} style={styles.innerContainer}>
              <FormInput
                name='code'
                placeholder={t('register.emailConfirmation.code')}
                label={t('register.emailConfirmation.inputLabel')}
                color='bgPaper'
              />

              <Button title={t('modal2fa.submit')} onPress={methods.handleSubmit(onSubmit)} />
            </Form>
          </View>
        </GradientBox>
        <FAQ />
      </ContainContainer>
    </ScrollView>
  )
}

export default EmailConfirmation
