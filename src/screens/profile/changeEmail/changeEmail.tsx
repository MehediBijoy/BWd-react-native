import * as yup from 'yup'
import {useEffect, useState} from 'react'
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
  const api = useApi()
  const styles = useStyles()
  const {profile} = useProfile()
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

  const {mutate, isLoading, error} = useMutation<UserInfo, ErrorObject, ChangeEmailProps>({
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
      <Form methods={methods} style={styles.form}>
        <FormInput name='email' placeholder='Enter new email' label='New Email' />
        {isMfaActive && <FormInput name='mfa_code' placeholder='xxx xxx' label='2FA Code' />}
        {isMfaRequired(error) && error?.message !== '2FA code is not present' && (
          <Text style={styles.error}>{error?.message}</Text>
        )}
        <Button
          title='Change Email'
          loading={isLoading}
          containerStyle={{maxWidth: '50%'}}
          onPress={methods.handleSubmit(onSubmit)}
        />
      </Form>

      <EmailConfirmationModal isOpened={isModalOpened} onClose={onClose} />
    </ContainContainer>
  )
}

const useStyles = makeStyles(({colors}) => ({
  form: {
    rowGap: 20,
    marginTop: 20,
  },
  error: {
    color: colors.error,
  },
}))

export default ChangeEmail
