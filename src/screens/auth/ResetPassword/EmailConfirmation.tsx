import * as yup from 'yup'
import {ScrollView, View} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {Button, Text, useTheme} from '@rneui/themed'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import SafeAreaView from '@core/SafeAreaView'
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
  const styles = useStyles()
  const {methods} = useYupHooks<FormFields>({schema: emailConfirmationSchema})

  const onSubmit = (data: FormFields) => {
    navigation.navigate('ChangePassword', data)
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <ContainContainer>
          <GradientBox styles={{marginTop: 30}}>
            <View style={{rowGap: 20}}>
              <Text h3 h3Style={styles.headerTextStyles}>
                Email Confirmation
              </Text>

              <MessageBox
                name='mail'
                type='entypo'
                color={theme.colors.white}
                message=' We have dispatched an email containing a verification code. Kindly input this code
                to continue and establish a new password.'
              />

              <Form methods={methods} style={styles.innerContainer}>
                <FormInput
                  name='code'
                  placeholder='Code'
                  label='Enter Verification Code'
                  color='bgPaper'
                />

                <Button title='Submit' onPress={methods.handleSubmit(onSubmit)} />
              </Form>
            </View>
          </GradientBox>
          <FAQ />
        </ContainContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EmailConfirmation
