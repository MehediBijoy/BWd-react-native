import * as yup from 'yup'
import React from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Text, Button} from '@rneui/themed'
import {useMutation} from '@tanstack/react-query'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import ContentContainer from '@core/ContentContainer'

import {ErrorObject} from 'api/Errors'
import {useApi, useOnUnauthorized} from 'hooks/api'
import {useProfileDetails, useYupHooks} from 'hooks/helper'

const passwordSchema = yup.object().shape({
  password: yup.string().required(),
})

type PasswordTypes = yup.InferType<typeof passwordSchema>

const DeleteAccountConfirm = () => {
  const api = useApi()
  const {t} = useTranslation()
  const unAuthorize = useOnUnauthorized()
  const {data} = useProfileDetails()
  const {methods, setFieldError} = useYupHooks<PasswordTypes>({schema: passwordSchema})

  const {mutate, isLoading} = useMutation({
    mutationFn: (password: string) => api.deleteUser({id: data?.id as number, password}),
    onError: (error: ErrorObject) => setFieldError({message: error.message, field: 'password'}),
    onSuccess: unAuthorize,
  })

  return (
    <ContentContainer>
      <View style={{marginVertical: 10, rowGap: 15, marginBottom: 20}}>
        <Text style={{fontSize: 16, fontWeight: '700'}}>
          {t('profile.deleteAccount.dear')} {data && data?.user_detail.first_name},
        </Text>
        <Text>{t('profile.deleteAccount.text1')}</Text>
        <Text>
          <Text style={{fontSize: 16, fontWeight: '700'}}>
            {t('profile.deleteAccount.text2-title')}
          </Text>
          {t('profile.deleteAccount.text2')}
        </Text>
        <Text>
          <Text style={{fontSize: 16, fontWeight: '700'}}>
            {t('profile.deleteAccount.text3-title')}
          </Text>
          {t('profile.deleteAccount.text3')}
        </Text>
      </View>
      <View>
        <Form methods={methods} style={{rowGap: 20}}>
          <FormInput
            name='password'
            type='password'
            label={t('deleteUser.label')}
            placeholder={t('forms.placeholders.password')}
          />
          <Button
            title={t('profile.deleteAccount.title')}
            type='solid'
            color='error'
            loading={isLoading}
            onPress={methods.handleSubmit(({password}) => mutate(password))}
          />
        </Form>
      </View>
    </ContentContainer>
  )
}

export default DeleteAccountConfirm
