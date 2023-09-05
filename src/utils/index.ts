import {ErrorObject} from 'api/Errors'
import {EstimateFee, User} from 'api/Response'

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

export const formatEstimatePay = (object: EstimateFee) => ({
  ...object,
  received_amount: parseFloat(object?.received_amount).toFixed(4),
  total_amount: parseFloat(object?.total_amount).toFixed(2),
  dynamic_fee_amount: parseFloat(object?.dynamic_fee_amount).toFixed(4),
})
