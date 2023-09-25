import {View} from 'react-native'
import {Text} from '@rneui/themed'

import Modal from '@core/Modal'
import StatusBadge from '@core/StatusBadge'

import {ReferralStats} from 'api/Response'
import {formatDate} from 'utils'

type ReferralModalProps = {
  isOpened: boolean
  data: ReferralStats
  onClose: () => void
}

type ColumnProps = {
  label: string
  text: string | JSX.Element | number
  [key: string]: any
}

const Column = ({label, text, ...rest}: ColumnProps) => (
  <View style={{flexDirection: 'row', marginVertical: 5}}>
    <Text style={{fontWeight: '700', width: 150}} {...rest}>
      {label}:
    </Text>
    <Text {...rest}>{text}</Text>
  </View>
)

const ReferralModal = ({isOpened, data, onClose}: ReferralModalProps) => (
  <Modal title='Referral Details' isOpened={isOpened} onClose={onClose}>
    <Column label={'Joining Date'} text={formatDate(data.referral_joined_at)} />
    <Column label={'Friends User ID'} text={data.referral_id} />
    <Column label={'Account Type'} text={data.referral_account_type} />
    <Column label={'Amount'} text={data.total_amount} />
    <Column label={'Regular Users'} text={data.referral_total_regulars} />
    <Column label={'Affiliates'} text={data.referral_total_affiliates} />
    <Column label={'Users Signed Up'} text={data.referral_total_invites} />
    <Column
      label={'Status'}
      text={
        <StatusBadge
          status={data.referral_status === 'active' ? 'completed' : 'rejected'}
          label={data.referral_status}
        />
      }
    />
  </Modal>
)

export default ReferralModal
