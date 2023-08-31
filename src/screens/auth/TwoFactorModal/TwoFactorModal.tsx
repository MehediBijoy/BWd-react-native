import * as yup from 'yup'
import React from 'react'
import {Button, Text, useTheme} from '@rneui/themed'

import Form from 'components/Form'
import Modal from 'components/Modal'
import FormInput from 'components/FormInput'
import useYupHooks from 'hooks/helper/useYupHooks'
import {ErrorObject} from 'api/Errors'

const twoFactorSchema = yup.object().shape({
  mfa_code: yup.string().required().min(6).max(6),
})
type twoFactorFields = yup.InferType<typeof twoFactorSchema>

export type TwoFactorModalProps = {
  isOpened: boolean
  isLoading: boolean
  error: ErrorObject | null
  onClose: () => void
  onSubmit(data: any): void
}

const TwoFactorModal = ({isOpened, isLoading, error, onClose, onSubmit}: TwoFactorModalProps) => {
  const {methods} = useYupHooks<twoFactorFields>({schema: twoFactorSchema})
  const {theme} = useTheme()

  React.useEffect(() => {
    methods.reset()
  }, [isOpened])

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
          onPress={methods.handleSubmit(data => onSubmit(data))}
        />
      </Form>
    </Modal>
  )
}

export default TwoFactorModal
