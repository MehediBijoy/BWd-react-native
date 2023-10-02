import React from 'react'
import * as yup from 'yup'
import {isAddress} from 'viem'
import {View} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {Button, Text, makeStyles} from '@rneui/themed'
import {useNavigation} from '@react-navigation/native'
import {DrawerNavigationProp} from '@react-navigation/drawer'

import Modal from '@core/Modal'
import Form from '@core/Form'
import FormInput from '@core/FormInput'
import FormCheckBox from '@core/FormCheckBox'

import {useApi} from 'hooks/api'
import {useProfile, useYupHooks} from 'hooks/helper'
import {RouteStack} from 'navigators/routes'

type PayoutModalProps = {
  isOpened: boolean
  onClose: () => void
  refetchPayoutCommissions: () => void
}

const payoutCommissionSchema = yup.object().shape({
  amount: yup.number().required().positive('Amount must be a positive number'),
  use_saved_address: yup.boolean().default(false),
  address: yup
    .string()
    .nonNullable()
    .when('use_saved_address', {
      is: true,
      then: () =>
        yup
          .string()
          // .nullable()
          .notRequired()
          .transform(() => null),
      otherwise: () => yup.string().required().test('_', 'Invalid address', isAddress),
    }),
  mfa_code: yup
    .string()
    .required('2FA code is required')
    .min(6, '2FA code Must 6 digits')
    .max(6, '2FA code Must 6 digits'),
})

type payoutCommissionFields = yup.InferType<typeof payoutCommissionSchema>

const PayoutModal = ({
  isOpened,
  onClose,

  refetchPayoutCommissions,
}: PayoutModalProps) => {
  const styles = useStyles()
  const api = useApi()
  const {profile} = useProfile()
  const navigation = useNavigation<DrawerNavigationProp<RouteStack, 'Purchase'>>()
  const {methods} = useYupHooks<payoutCommissionFields>({schema: payoutCommissionSchema})

  const isSaveAddress = methods.watch('use_saved_address')

  React.useEffect(() => {
    if (isSaveAddress) {
      methods.clearErrors('address')
      methods.setValue('address', profile?.payout_address)
    } else {
      methods.setValue('address', '')
    }
  }, [isSaveAddress, methods, profile?.payout_address])

  const {mutate, isLoading} = useMutation({
    mutationFn: api.commissionPayout,
    onSuccess: () => {
      onClose()
      methods.reset()
      refetchPayoutCommissions()
    },
  })

  const submit = ({mfa_code, ...rest}: payoutCommissionFields) => {
    mutate({payout: rest, mfa_code})
  }

  return (
    <Modal
      title={profile?.google_mfa_activated ? 'Payout Commissions' : 'Your 2FA is not Enabled'}
      onClose={() => {
        onClose()
        methods.reset()
      }}
      isOpened={isOpened}
    >
      {profile?.google_mfa_activated ? (
        <View>
          <Form methods={methods} style={styles.from}>
            <FormInput
              name='amount'
              label='Amount'
              keyboardType='numeric'
              placeholder='Enter your amount'
            />
            <FormInput
              name='address'
              label='Address'
              placeholder='Enter your address'
              editable={isSaveAddress ? false : true}
            />
            {profile?.payout_address && (
              <FormCheckBox name='use_saved_address' label='Use previous address' />
            )}
            <FormInput name='mfa_code' label='2FA Code' placeholder='xxx xxx' />
            <Button title='Submit' loading={isLoading} onPress={methods.handleSubmit(submit)} />
          </Form>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>
            To ensure a safe Payout. You must enable your 2-Factor Authentication (2FA)
          </Text>
          <Button
            title='Enable 2FA'
            containerStyle={{marginTop: 20}}
            onPress={() => {
              onClose()
              navigation.navigate('ProfileMFA')
            }}
          />
        </View>
      )}
    </Modal>
  )
}

const useStyles = makeStyles(({colors}) => ({
  label: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  from: {
    rowGap: 20,
  },
}))

export default PayoutModal
