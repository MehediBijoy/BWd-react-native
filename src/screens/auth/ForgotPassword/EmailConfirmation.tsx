import * as yup from 'yup'
import {ScrollView, View} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {Button, Text} from '@rneui/themed'

import Form from 'components/Form'
import Input from 'components/Input'
import SafeAreaView from 'components/SafeAreaView'
import useYupHooks from 'hooks/helper/useYupHooks'
import ContainContainer from 'components/ContentContainer'
import FAQ from 'screens/auth/FAQ/FAQ'
import {RouteStack} from 'navigators/routes'

import GradientBox from '../GradientBox'
import MessageBox from '../MessageBox'

import {useStyles} from './ForgotPassword.styles'

const emailConfirmationSchema = yup.object().shape({
  code: yup.string().required(),
})

type FormFields = yup.InferType<typeof emailConfirmationSchema>

const EmailConfirmation = ({
  navigation,
}: NativeStackScreenProps<RouteStack, 'EmailConfirmation'>) => {
  const styles = useStyles()
  const methods = useYupHooks<FormFields>({schema: emailConfirmationSchema})

  const onSubmit = (data: FormFields) => {
    navigation.navigate('ChangePassword', data)
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <ContainContainer>
          <GradientBox>
            <View style={{rowGap: 20}}>
              <Text h3 h3Style={styles.headerTextStyles}>
                Email Confirmation
              </Text>
              <MessageBox
                icon='mail'
                iconType='entypo'
                iconBgColor='#fff'
                message=' We have dispatched an email containing a verification code. Kindly input this code
                to continue and establish a new password.'
              />
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
          </GradientBox>
          <FAQ />
        </ContainContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EmailConfirmation
