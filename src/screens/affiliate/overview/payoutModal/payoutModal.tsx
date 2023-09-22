import * as yup from 'yup'
import {isAddress} from 'viem'
import {View} from 'react-native'
import {Button, Text, makeStyles} from '@rneui/themed'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import Modal from '@core/Modal'
import Form from '@core/Form'
import FormInput from '@core/FormInput'

import {useProfile} from 'hooks/helper'
import {RouteStack} from 'navigators/routes'

type PayoutModalProps = {
  isOpened: boolean
  onClose: () => void
  navigation: NativeStackScreenProps<RouteStack, 'Affiliates'>['navigation']
}

const payoutCommissionSchema = yup.object().shape({
  amount: yup
    .number()
    .required('Amount is required')
    .typeError('Amount is required')
    .positive('Amount must be a positive number'),
  use_saved_address: yup.boolean().default(false),
  address: yup
    .string()
    .nullable()
    .when('use_saved_address', {
      is: (val: any) => val as boolean, // Type assertion
      then: yup
        .string()
        .nullable()
        .notRequired()
        .transform(() => null) as yup.StringSchema<null>, // Type assertion
      otherwise: yup
        .string()
        .required()
        .test('_', 'Invalid address', value => {
          // Your custom address validation logic here
          return true // Replace with your validation logic
        }),
    }),
  mfa_code: yup
    .string()
    .required('2FA is required')
    .min(6, '2FA must be at least 6 characters')
    .max(6, '2FA must be at most 6 characters'),
})

const PayoutModal = ({isOpened, onClose, navigation}: PayoutModalProps) => {
  const {profile} = useProfile()
  const styles = useStyles()

  return (
    <Modal
      title={profile?.google_mfa_activated ? 'Payout Commissions' : 'Your 2FA is not Enabled'}
      onClose={onClose}
      isOpened={isOpened}
    >
      {profile?.google_mfa_activated ? (
        <View>
          <Text>This is the payout modal </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>
            To ensure a safe Payout. You must enable your 2-Factor Authentication (2FA)
          </Text>
          <Button
            title='Enable 2FA'
            containerStyle={{marginTop: 20, maxWidth: '50%'}}
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
}))

export default PayoutModal
