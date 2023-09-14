import {ErrorObject} from 'api/Errors'
import {EstimateFee, User} from 'api/Response'
import {APP_BASE_URL} from 'config/environments'

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

export const shortAddress = (address: string, skip = 5) => {
  return address.slice(0, skip) + '.'.repeat(3) + address.slice(-(skip - 2))
}

export const makeReferralLink = (token: string) => {
  const rootUrl = APP_BASE_URL + `/invite?token=${token}`
  return rootUrl
}
export function getMonth(month: number, lang = 'en') {
  const date = new Date()
  date.setMonth(month - 1)

  return date.toLocaleString(lang, {month: 'long'})
}

export const formatDate = (date: Date) => {
  const day = date.getDate()
  const month = date.toLocaleString('default', {month: 'short'})
  return `${day} ${month}`
}

export const updateWalletConnectTitle = (title?: string) => {
  const prefix = title?.slice(0, 5)
  const suffix = title?.slice(-4)

  const masked = prefix + '.'.repeat(4) + suffix
  return masked
}
