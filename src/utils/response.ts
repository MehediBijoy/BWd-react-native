import {User, EstimateFee} from 'api/Response'
import {ErrorObject} from 'api/Errors'

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
