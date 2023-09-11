import {User} from 'api/Response'
import {ErrorObject} from 'api/Errors'
import {APP_BASE_URL} from 'config/environments'

export function isUserConfirmed(user: User) {
  return user && user.email_confirmed && user.kyc_status === 'approved'
}

export const isMfaRequired = (error: ErrorObject) => {
  if (error.code === '005') {
    const err = error?.message.toLowerCase()
    return (
      err === 'MFA code is not present'.toLowerCase() ||
      err === '2FA code is not present'.toLowerCase()
    )
  }
  return false
}

export const shortAddress = (address: string) => {
  return address.slice(0, 5) + '.'.repeat(3) + address.slice(-3)
}

export const makeReferralLink = (token: string) => {
  const rootUrl = APP_BASE_URL + `/invite?token=${token}`
  return rootUrl
}
