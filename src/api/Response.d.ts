export type User = {
  id: number
  email: string
  email_confirmed: boolean
  google_mfa_activated: boolean
  kyc_status: string
  kyc_status_reason: string
  last_sign_in_at: Date
  locked_at: Date
  failed_attempts: number
  subscribed: boolean
  wallet_address: string
  wallet_address_candidate: string
  wallet_type: string
  wallet_type_candidate: string
  user_type: string
  referral_token: string
  downline_users_count: number
  payout_address: string
  status: string
  status_reason: string
  created_at: Date
  updated_at: Date
}

export type LoginResponse = Promise<{
  user: User
  token: string
}>
