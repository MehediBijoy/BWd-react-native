import * as yup from 'yup'
import {useEffect, useState} from 'react'
import {View} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {Button, makeStyles, Text} from '@rneui/themed'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import ContainContainer from '@core/ContentContainer'

import {useYupHooks, useProfile} from 'hooks/helper'
import {RouteStack} from 'navigators/routes'
import useApi from 'hooks/api/useApi'
import {UserInfo} from 'api/Response'
import {ErrorObject} from 'api/Errors'
import {ChangeEmailProps} from 'api/Request'
import {isMfaRequired} from 'utils'

import EmailConfirmationModal from './confirmationModal'

const emailChangeSchema = yup.object().shape({
  email: yup.string().email('Email must be a valid email').required('Email is required'),
  mfa_code: yup.string().max(6, '2FA code Must 6 digits').min(6, '2FA code Must 6 digits'),
})

type emailChangeFields = yup.InferType<typeof emailChangeSchema>

const ChangeEmail = ({navigation}: NativeStackScreenProps<RouteStack>) => {
  const styles = useStyles()
  const {profile} = useProfile()
  const api = useApi()
  const parent = navigation.getParent()
  const [isMfaActive, setIsMfaActive] = useState(false)
  const [isModalOpened, setIsModalOpened] = useState(false)

  const {methods, setApiError} = useYupHooks<emailChangeFields>({schema: emailChangeSchema})

  useEffect(() => {
    parent?.setOptions({
      headerShown: false,
    })
    return () => {
      parent?.setOptions({
        headerShown: true,
      })
    }
  }, [parent])

  const {mutate, isLoading, error, isSuccess} = useMutation<
    UserInfo,
    ErrorObject,
    ChangeEmailProps
  >({
    mutationFn: api.changeEmail,
    onSuccess: () => setIsModalOpened(true),
    onError: error => {
      setApiError(error)
      if (isMfaRequired(error)) setIsMfaActive(true)
    },
  })

  const onSubmit = ({email, mfa_code}: emailChangeFields) => {
    mutate({id: profile?.id as number, email, mfa_code})
  }

  const onClose = () => {
    setIsModalOpened(false)
    navigation.navigate('Settings')
  }

  return (
    <ContainContainer>
      <View style={styles.container}>
        {isSuccess && (
          <Text h4 h4Style={{color: '#005500', textAlign: 'center', marginBottom: 20}}>
            Email Successfully Send
          </Text>
        )}
        <Form methods={methods} style={{rowGap: 20}}>
          <FormInput name='email' placeholder='Enter new email' label='New Email' />
          {isMfaActive && <FormInput name='mfa_code' placeholder='xxx xxx' label='2FA Code' />}
          {isMfaRequired(error) && error?.message !== '2FA code is not present' && (
            <Text>{error?.message}</Text>
          )}
          <Button
            title='Change Email'
            loading={isLoading}
            containerStyle={{maxWidth: '50%'}}
            onPress={methods.handleSubmit(onSubmit)}
          />
        </Form>
      </View>

      <EmailConfirmationModal isOpened={isModalOpened} onClose={onClose} />
    </ContainContainer>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 20,
  },
}))

export default ChangeEmail
