export type Success = {
  success: true | boolean
}

export type User = {
  id: number
  email: string
  email_confirmed: boolean
  google_mfa_activated: boolean
  kyc_status: 'init' | 'panding' | 'approved'
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

export type UserDetail = {
  first_name?: string
  last_name?: string
  phone_number?: string
  profession: string
  earnings?: string
  source_of_income?: string
  trading_experience?: string
  sumsub_email?: string
  gender?: string
  date_of_birth?: string
  country?: string
  nationality?: string
  address_country?: string
  address_postcode?: string
  address_town?: string
  address_street?: string
  address_substreet?: string
  address_state?: string
}

export type UserInfo = {
  user_detail?: UserDetail
} & User

export type LoginResponse = {
  user: User
  token: string
}

export type KycAccessKey = {
  sucess: boolean
  result: {
    token: string
  }
}
