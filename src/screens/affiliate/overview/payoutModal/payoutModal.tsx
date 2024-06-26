import React from 'react'
import * as yup from 'yup'
import {isAddress} from 'viem'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
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
  amount: yup.number().required().positive(),
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
      otherwise: () => yup.string().required().test('_', 'schema.invalid-address', isAddress),
    }),
  mfa_code: yup.string().required().min(6).max(6),
})

type payoutCommissionFields = yup.InferType<typeof payoutCommissionSchema>

const PayoutModal = ({
  isOpened,
  onClose,

  refetchPayoutCommissions,
}: PayoutModalProps) => {
  const styles = useStyles()
  const api = useApi()
  const {t} = useTranslation()
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
      title={
        profile?.google_mfa_activated
          ? t('affiliate.payoutCommission.title1')
          : t('affiliate.payoutCommission.title2')
      }
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
              label={t('affiliate.payoutCommission.amount')}
              keyboardType='numeric'
              placeholder={t('dashboard.buy.enterAmount')}
            />
            <FormInput
              name='address'
              label={t('affiliate.payoutCommission.address')}
              placeholder={t('affiliate.payoutCommission.addressPlaceholder')}
              editable={isSaveAddress ? false : true}
            />
            {profile?.payout_address && (
              <FormCheckBox
                name='use_saved_address'
                label={t('affiliate.payoutCommission.checkboxLabel')}
              />
            )}
            <FormInput name='mfa_code' label={t('modal2fa.inputLabel')} placeholder='xxx xxx' />
            <Button
              title={t('common.submit')}
              loading={isLoading}
              onPress={methods.handleSubmit(submit)}
            />
          </Form>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>{t('affiliate.payoutCommission.2faInfo')}</Text>
          <Button
            title={t('affiliate.enabledBtn')}
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
