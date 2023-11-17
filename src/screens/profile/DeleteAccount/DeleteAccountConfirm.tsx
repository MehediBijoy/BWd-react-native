import * as yup from 'yup'
import React from 'react'
import {View} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {Text, Button, Divider} from '@rneui/themed'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import ContentContainer from '@core/ContentContainer'

import {useApi} from 'hooks/api'
import {useProfileDetails, useYupHooks} from 'hooks/helper'

const passwordSchema = yup.object().shape({
  password: yup.string().required(),
})

type PasswordTypes = yup.InferType<typeof passwordSchema>

const DeleteAccountConfirm = () => {
  const api = useApi()
  const {data} = useProfileDetails()
  const {methods} = useYupHooks<PasswordTypes>({schema: passwordSchema})

  // Todo: will add success and error cases
  const {mutate, isLoading} = useMutation({
    mutationFn: (password: string) => api.deleteUser({id: data?.id as number, password}),
  })

  return (
    <ContentContainer>
      <Text h4 style={{textAlign: 'center', marginTop: 30, marginBottom: 10}}>
        Account Deletion Confirmation
      </Text>
      <Divider />
      <View style={{marginVertical: 10, rowGap: 15, marginBottom: 20}}>
        <Text style={{fontSize: 16, fontWeight: '700'}}>
          Dear {data && data?.user_detail.first_name},
        </Text>
        <Text>
          We understand that you&apos;ve requested to delete your account. Before proceeding, please
          take a moment to review the following information:
        </Text>
        <Text>
          <Text style={{fontSize: 16, fontWeight: '700'}}>Data Removal:</Text> Deleting your account
          will permanently remove all associated data, including profile information, saved
          preferences, and transaction history.
        </Text>
        <Text>
          <Text style={{fontSize: 16, fontWeight: '700'}}>Irreversible Action:</Text> Account
          deletion is irreversible. Once you confirm, your account cannot be recovered, and any
          associated content will be lost.
        </Text>
      </View>
      <View>
        <Form methods={methods} style={{rowGap: 20}}>
          <FormInput name='password' label='Enter your password' placeholder='password' />
          <Button
            title='Delete Account'
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
