import * as yup from 'yup'
import {useTranslation} from 'react-i18next'
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
  verification_code: yup.string().required(),
})

type emailChangeFields = yup.InferType<typeof emailConfirmSchema>

const EmailConfirmationModal = ({isOpened, onClose}: EmailConfirmationModalProps) => {
  const api = useApi()
  const {t} = useTranslation()
  const client = useQueryClient()
  const {setToken} = useAuthToken()
  const {setProfile, profile} = useProfile()
  const {methods, setApiError} = useYupHooks<emailChangeFields>({schema: emailConfirmSchema})

  const {mutate} = useMutation({
    mutationFn: api.emailConfirm,
    onSuccess: ({user, token}) => {
      setProfile(user)
      user && setToken(token)
      client.invalidateQueries([cacheKey.userDetails, profile?.id])
      onClose()
    },
    onError: setApiError,
  })

  const onSubmit = ({verification_code}: emailChangeFields) => {
    mutate(verification_code)
  }

  return (
    <Modal title={t('register.emailConfirmation.title')} isOpened={isOpened} onClose={onClose}>
      <Form methods={methods} style={{rowGap: 20}}>
        <FormInput
          name='verification_code'
          label={t('register.emailConfirmation.code')}
          placeholder={t('register.emailConfirmation.inputLabel')}
        />
        <Button title={t('common.submit')} onPress={methods.handleSubmit(onSubmit)} />
      </Form>
    </Modal>
  )
}

export default EmailConfirmationModal
