import React, {useState} from 'react'
import {ScrollView, View} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {Button, Text, makeStyles} from '@rneui/themed'

import Modal from '@core/Modal'
import SafeAreaView from '@core/SafeAreaView'
import ContainContainer from '@core/ContentContainer'

import {useApi} from 'hooks/api'
import {useProfile} from 'hooks/helper'
import MessageBox from 'screens/auth/MessageBox'
import GradientBox from 'screens/auth/GradientBox'

import FAQ from '../../FAQ'
import StepNumber from '../StepNumber'

const EmailConfirm = () => {
  const api = useApi()
  const styles = useStyles()
  const {profile} = useProfile()
  const [isOpened, setOpened] = useState<boolean>(false)

  const {mutate, isLoading} = useMutation({
    mutationFn: api.resendEmailConfirmation,
    onSuccess: () => setOpened(true),
  })

  return (
    <SafeAreaView>
      <ScrollView>
        <ContainContainer>
          <StepNumber current={2} />
          <GradientBox>
            <Text h2 h2Style={styles.textColor}>
              Welcome to BWG
            </Text>
            <MessageBox
              containerStyle={{marginTop: 20}}
              name='email-fast-outline'
              type='material-community'
              message='Confirm your email'
              color='white'
              size={35}
            />
            <Text style={[styles.textColor, styles.paragraph]}>
              Before using the platform you need to confirm your identity. {'\n\n'}First step is the
              email confirmation. We have send you an email with an activation link. Click on the
              activation link to activate your account. {'\n\n'}Please note that this link is only
              valid for 15 minutes.
            </Text>
            <Button
              loading={isLoading}
              title='Resend email'
              onPress={() => profile && mutate({email: profile.email})}
              containerStyle={{maxWidth: 150}}
            />
          </GradientBox>
          <Modal title='EMAIL RESENT' isOpened={isOpened} onClose={() => setOpened(!isOpened)}>
            <View style={{alignItems: 'flex-start', rowGap: 15}}>
              <Text style={{fontSize: 16}}>
                We’ve sent you a new confirmation link to mehedi@gmail.com. Note that the reset link
                is valid for 15 minutes.
              </Text>
              <Button
                title='Ok'
                size='sm'
                containerStyle={{width: 100}}
                onPress={() => setOpened(!isOpened)}
              />
            </View>
          </Modal>
          <FAQ />
        </ContainContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

const useStyles = makeStyles(({colors}) => ({
  textColor: {
    color: colors.textReverse,
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 20,
  },
}))

export default EmailConfirm
