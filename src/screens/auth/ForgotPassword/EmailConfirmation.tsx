import * as yup from 'yup'
import {ScrollView, View} from 'react-native'
import {Button, Text, useTheme} from '@rneui/themed'
import LinearGradient from 'react-native-linear-gradient'

import Form from 'components/Form'
import Input from 'components/Input'
import SafeAreaView from 'components/SafeAreaView'
import useYupHooks from 'hooks/helper/useYupHooks'
import ContainContainer from 'components/ContentContainer'
import FAQ from 'screens/auth/FAQ/FAQ'
import routes from 'Navigators/routes'

import {useStyles} from './ForgotPassword.styles'

const emailConfirmationSchema = yup.object().shape({
  code: yup.string().required(),
})

const EmailConfirmation = ({navigation}: any) => {
  const {theme} = useTheme()
  const styles = useStyles()
  const methods = useYupHooks({schema: emailConfirmationSchema})

  const onSubmit = (data: any) => {
    console.log(data)
    navigation.navigate(routes.auth.changePassword.path, data)
  }

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
                Email Confirmation
              </Text>
              <Text style={styles.infoStyles}>
                We have dispatched an email containing a verification code. Kindly input this code
                to continue and establish a new password.
              </Text>
              <Form methods={methods} style={styles.innerContainer}>
                <Input
                  name='code'
                  placeholder='Code'
                  label='Enter Verification Code'
                  labelProps={{style: styles.inputLabelProps}}
                />
                <Button title='Submit' onPress={methods.handleSubmit(onSubmit)} />
              </Form>
            </View>
          </LinearGradient>
          <FAQ />
        </ContainContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EmailConfirmation
