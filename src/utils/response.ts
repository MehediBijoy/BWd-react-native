import {TFunction} from 'i18next'

import {User, EstimateFee, OrderHistory, ReferralAccount} from 'api/Response'
import {ErrorObject} from 'api/Errors'
import {formatDate, formatNumber, shorten} from 'utils'
import {LanguageTypes} from 'i18n/i18n'

export function isUserConfirmed(user: User) {
  return user && user.email_confirmed && user.kyc_status === 'approved'
}

export const isMfaRequired = (error: ErrorObject | null) => error && error.code === '005'

export const formatEstimatePay = (object: EstimateFee): EstimateFee => ({
  ...object,
  received_amount: parseFloat(object?.received_amount as unknown as string).toFixed(4),
  total_amount: parseFloat(object?.total_amount as unknown as string).toFixed(2),
  dynamic_fee_amount: parseFloat(object?.dynamic_fee_amount as unknown as string).toFixed(4),
})

export const formatOrders = (
  object: OrderHistory,
  currentLang: LanguageTypes,
  t: TFunction
): OrderHistory => ({
  payments: object?.payments?.map(payment => ({
    ...payment,
    orderId: `#${payment.id}`,
    paidAmount: `${formatNumber(payment.paid_amount_number, {locales: currentLang})} ${
      payment.paid_amount_currency
    }`,
    receivedAmount: `${formatNumber(payment.received_amount_number, {locales: currentLang})} ${
      payment.received_amount_currency
    }`,
    stage: payment.transfer?.status
      ? t('trade.table.headers.transfer')
      : t('trade.table.headers.payment'),

    orderStatus: payment.transfer?.status ?? payment.status,
    createdTime: formatDate(payment.created_at, 'hh:mm A'),
    createdDate: formatDate(payment.created_at, 'MMM DD,YYYY'),
  })),
  meta: object?.meta,
})

export const formatReferralStats = (
  object: ReferralAccount,
  currentLang: LanguageTypes,
  t: TFunction
): ReferralAccount => ({
  referrals_stats: object?.referrals_stats.map(item => ({
    ...item,
    referralAccount: `${t(
      'affiliate.refTable.accountType'
    )}: ${item.referral_account_type.toUpperCase()}`,
    referralName: `${t('affiliate.refTable.name')}: ${item.referral_full_name}`,
    referralEmail: `${t('affiliate.refTable.email')}: ${shorten(item.referral_email, 7)}`,
    totalAmount: formatNumber(item.total_amount, {minimumFractionDigits: 4, locales: currentLang}),
    commissionAmount: `${t('affiliate.payoutCommission.amount')}: ${formatNumber(
      item.total_amount,
      {locales: currentLang, maximumFractionDigits: 4}
    )}`,
    view: item.referral_total_invites !== 0,
  })),
  meta: object.meta,
  previous_referrer_id: object.previous_referrer_id,
  referrer_name: object.referrer_name,
})
