import React, {useEffect, useState} from 'react'
import {ScrollView, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useMutation} from '@tanstack/react-query'
import {Button, Text, makeStyles} from '@rneui/themed'

import Modal from '@core/Modal'
import ContainContainer from '@core/ContentContainer'

import {useApi} from 'hooks/api'
import {User} from 'api/Response'
import {useProfile, useSocket} from 'hooks/helper'
import MessageBox from 'screens/auth/MessageBox'
import GradientBox from 'screens/auth/GradientBox'

import FAQ from '../../FAQ'
import StepNumber from '../StepNumber'

type EmailConfirmProps = {
  event: {name: 'email_confirmed'; data: User}
}

const EmailConfirm = () => {
  const api = useApi()
  const styles = useStyles()
  const {t} = useTranslation()
  const {profile, setProfile} = useProfile()
  const [isOpened, setOpened] = useState<boolean>(false)
  const {subscribe} = useSocket()

  const {mutate, isLoading} = useMutation({
    mutationFn: api.resendEmailConfirmation,
    onSuccess: () => setOpened(true),
  })

  useEffect(() => {
    subscribe('NotificationsChannel', {
      received(data: EmailConfirmProps) {
        if (data.event.name === 'email_confirmed') {
          setProfile(data.event.data)
        }
      },
    })
  }, [setProfile, subscribe])

  return (
    <ScrollView>
      <ContainContainer>
        <StepNumber current={2} />
        <GradientBox>
          <Text h2 h2Style={styles.textColor}>
            {t('register.confirmEmail.welcomeTitle')}
          </Text>
          <MessageBox
            containerStyle={{marginTop: 20}}
            name='email-fast-outline'
            type='material-community'
            message={t('register.confirmEmail.confirmTitle')}
            color='white'
            size={35}
          />
          <Text style={[styles.textColor, styles.paragraph]}>
            {t('register.confirmEmail.description')}
          </Text>
          <Button
            loading={isLoading}
            title='Resend email'
            onPress={() => profile && mutate({email: profile.email})}
            containerStyle={{maxWidth: 150}}
          />
        </GradientBox>
        <Modal
          title={t('modals.confirmEmailResent.title')}
          isOpened={isOpened}
          onClose={() => setOpened(!isOpened)}
        >
          <View style={{alignItems: 'flex-start', rowGap: 15}}>
            <Text style={{fontSize: 16}}>
              {t('modals.confirmEmailResent.description', {email: profile?.email})}
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
