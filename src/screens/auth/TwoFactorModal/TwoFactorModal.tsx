import * as yup from 'yup'
import React from 'react'
import {Button, Text, useTheme} from '@rneui/themed'

import Form from '@core/Form'
import Modal from '@core/Modal'
import FormInput from '@core/FormInput'

import {ErrorObject} from 'api/Errors'
import useYupHooks from 'hooks/helper/useYupHooks'

const twoFactorSchema = yup.object().shape({
  mfa_code: yup.string().required().min(6).max(6),
})
type twoFactorFields = yup.InferType<typeof twoFactorSchema>

export type TwoFactorModalProps = {
  isOpened: boolean
  isLoading: boolean
  error: ErrorObject | null
  onClose: () => void
  onSubmit(mfa_code: string): void
}

const TwoFactorModal = ({isOpened, isLoading, error, onClose, onSubmit}: TwoFactorModalProps) => {
  const {methods} = useYupHooks<twoFactorFields>({schema: twoFactorSchema})
  const {theme} = useTheme()

  React.useEffect(() => {
    methods.reset()
  }, [isOpened, methods])

  return (
    <Modal title='ENTER THE 2FA CODE' isOpened={isOpened} onClose={onClose}>
      <Text style={{fontSize: 16, marginBottom: 15}}>
        To confirm your identity enter the two-factor authorization code.
      </Text>
      <Form methods={methods} style={{rowGap: 10}}>
        <FormInput name='mfa_code' placeholder='XXX XXX' label='2FA Code' />

        {error && <Text style={{color: theme.colors.error}}> {error.message}</Text>}

        <Button
          title='Submit'
          loading={isLoading}
          onPress={methods.handleSubmit(({mfa_code}) => onSubmit(mfa_code))}
        />
      </Form>
    </Modal>
  )
}

export default TwoFactorModal
