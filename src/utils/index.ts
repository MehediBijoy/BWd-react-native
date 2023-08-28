import {User} from 'api/Response'

export function isUserConfirmed(user: User) {
  return user && user.email_confirmed && user.kyc_status === 'approved'
}
