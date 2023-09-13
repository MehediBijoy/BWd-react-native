import * as yup from 'yup'
import {Button} from '@rneui/themed'
import {useMutation, useQueryClient} from '@tanstack/react-query'

import Modal from '@core/Modal'
import Form from '@core/Form'
import FormInput from '@core/FormInput'

import {cacheKey} from 'api'
import {useApi, useAuthToken} from 'hooks/api'
import {useProfile, useYupHooks} from 'hooks/helper'

type EmailConfirmationModalProps = {
  isOpened: boolean
  onClose: () => void
}

const emailConfirmSchema = yup.object().shape({
  verification_code: yup.string().required('Code is required'),
})

type emailChangeFields = yup.InferType<typeof emailConfirmSchema>

const EmailConfirmationModal = ({isOpened, onClose}: EmailConfirmationModalProps) => {
  const api = useApi()
  const client = useQueryClient()
  const {setToken} = useAuthToken()
  const {setProfile, profile} = useProfile()
  const {methods, setApiError} = useYupHooks<emailChangeFields>({schema: emailConfirmSchema})

  const {mutate} = useMutation({
    mutationFn: api.emailConfirm,
    onSuccess: ({user, token}) => {
      setToken(token)
      setProfile(user)
      client.invalidateQueries([cacheKey.userDetails, profile?.id])
      onClose()
    },
    onError: setApiError,
  })

  const onSubmit = ({verification_code}: emailChangeFields) => {
    mutate({token: verification_code})
  }

  return (
    <Modal title='Email Confirmation' isOpened={isOpened} onClose={onClose}>
      <Form methods={methods} style={{rowGap: 20}}>
        <FormInput
          name='verification_code'
          label='Verification Code'
          placeholder='Verification Code'
        />
        <Button title='Enter Code' onPress={methods.handleSubmit(onSubmit)} />
      </Form>
    </Modal>
  )
}

export default EmailConfirmationModal
