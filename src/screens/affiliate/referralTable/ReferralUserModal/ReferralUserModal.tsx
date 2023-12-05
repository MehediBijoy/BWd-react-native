import {View} from 'react-native'
import {Text} from '@rneui/themed'
import {useTranslation} from 'react-i18next'

import Modal from '@core/Modal'
import StatusBadge from '@core/StatusBadge'

import {useLocales} from 'hooks/states'
import {ReferralStats} from 'api/Response'
import {formatDate, capitalize, formatNumber} from 'utils'

type ReferralModalProps = {
  isOpened: boolean
  data: ReferralStats
  onClose: () => void
}

type ColumnProps = {
  label: string
  text: string | JSX.Element | number
  [key: string]: unknown
}

const Column = ({label, text, ...rest}: ColumnProps) => (
  <View style={{flexDirection: 'row', marginVertical: 5}}>
    <Text style={{fontWeight: '700', width: 150}} {...rest}>
      {label}:
    </Text>
    <Text {...rest}>{text}</Text>
  </View>
)

const ReferralModal = ({isOpened, data, onClose}: ReferralModalProps) => {
  const {t} = useTranslation()
  const {currentLang} = useLocales()

  return (
    <Modal title={t('affiliate.referralModals.modalTitle')} isOpened={isOpened} onClose={onClose}>
      <Column label={t('affiliate.referralModals.name')} text={data.referral_full_name} />
      <Column label={t('affiliate.referralModals.email')} text={data.referral_email} />
      <Column
        label={t('affiliate.referralModals.joiningDate')}
        text={formatDate(data.referral_joined_at)}
      />
      <Column label={t('affiliate.referralModals.friendsUserId')} text={data.referral_id} />
      <Column
        label={t('affiliate.referralModals.accountType')}
        text={capitalize(data.referral_account_type)}
      />
      <Column
        label={t('affiliate.referralModals.amount')}
        text={formatNumber(data.total_amount, {locales: currentLang, minimumFractionDigits: 4})}
      />
      <Column
        label={t('affiliate.referralModals.regularUsers')}
        text={data.referral_total_regulars}
      />
      <Column
        label={t('affiliate.referralModals.affiliates')}
        text={data.referral_total_affiliates}
      />
      <Column
        label={t('affiliate.referralModals.usersSignedUp')}
        text={data.referral_total_invites}
      />
      <Column
        label={t('affiliate.refTable.status')}
        text={
          <StatusBadge
            status={data.referral_status}
            label={t(`affiliate.statuses.${data.referral_status}`)}
          />
        }
      />
    </Modal>
  )
}

export default ReferralModal
