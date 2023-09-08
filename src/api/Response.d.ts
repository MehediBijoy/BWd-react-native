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

export type Asset = {
  id: number
  max_payment_amount: string
  min_payment_amount: string
  name: string
  symbol: string
  token_amount: string | null
  paypal_max_payment_amount: string
  price: string
  market_cap: string
  static_fee_amount: string
  created_at: Date
}

type DynamicFee = {
  asset_id: number
  fee_percentage: string
  id: number
  minimum_value: string
  created_at: string
  updated_at: string
}

type EstimateFee = {
  dynamic_fee_amount: string
  dynamic_fee_percentage: string
  payment_rate: string
  received_amount: string
  static_fee_amount: string
  total_amount: string
  total_fee_amount: string
  usd_total_amount: string
  usd_total_fee: string
  storage_fee_amount: string
  storage_fee_percentage: string
  storage_fee_remaining_days: number
}
