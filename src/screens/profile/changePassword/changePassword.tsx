import * as yup from 'yup'
import React from 'react'
import {useMutation} from '@tanstack/react-query'
import {Text, Button, makeStyles} from '@rneui/themed'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import ContainContainer from '@core/ContentContainer'

import {RouteStack} from 'navigators/routes'
import {useYupHooks} from 'hooks/helper'
import {useApi} from 'hooks/api'
import {ErrorObject} from 'api/Errors'
import {Success} from 'api/Response'
import {ChangePasswordProps} from 'api/Request'
import {isMfaRequired} from 'utils'

const changePasswordSchema = yup.object().shape({
  mfa_code: yup.string().max(6, '2FA code Must 6 digits').min(6, '2FA code Must 6 digits'),
  current_password: yup.string().required('Current Password is required field'),
  password: yup.string().required().min(8),
  password_confirmation: yup
    .string()
    .required('Password confirmation is required field')
    .oneOf([yup.ref('password')], 'Password did not match '),
})

type changePasswordFields = yup.InferType<typeof changePasswordSchema>

const ChangePassword = ({navigation}: NativeStackScreenProps<RouteStack>) => {
  const api = useApi()
  const parent = navigation.getParent()
  const styles = useStyles()

  const [isMfaActive, setIsMfaActive] = React.useState(false)

  const {methods} = useYupHooks<changePasswordFields>({schema: changePasswordSchema})

  React.useEffect(() => {
    parent?.setOptions({
      headerShown: false,
    })
    return () => {
      parent?.setOptions({
        headerShown: true,
      })
    }
  }, [parent])

  const {mutate, error, isLoading} = useMutation<Success, ErrorObject, ChangePasswordProps, any>({
    mutationFn: api.changePassword,
    onError: error => {
      if (isMfaRequired(error)) setIsMfaActive(true)
    },
    onSuccess: () => navigation.navigate('Settings'),
  })

  const handleSubmit = ({mfa_code, ...user}: changePasswordFields) => {
    mutate({user, mfa_code})
  }

  return (
    <ContainContainer>
      <Form methods={methods} style={styles.form}>
        <FormInput
          name='current_password'
          type='password'
          label='Current Password'
          placeholder='Enter current password'
        />
        <FormInput
          name='password'
          type='password'
          label='New Password'
          placeholder='Enter new password'
        />
        <FormInput
          name='password_confirmation'
          type='password'
          label='Confirm Password'
          placeholder='Enter confirm password'
        />

        {isMfaActive && <FormInput name='mfa_code' placeholder='xxx xxx' label='2FA Code' />}
        {isMfaRequired(error) && error?.message !== '2FA code is not present' && (
          <Text style={styles.error}>{error?.message}</Text>
        )}

        <Button
          title='Update Password'
          loading={isLoading}
          containerStyle={{maxWidth: '50%'}}
          onPress={methods.handleSubmit(handleSubmit)}
        />
      </Form>
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

export default ChangePassword
