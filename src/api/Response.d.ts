export type Success = {
  success: true | boolean
}

export type Meta = {
  total: number
  limit: number
  offset: number
  page: number
}

type UserStatus = 'active' | 'inactive' | 'investigate' | 'blocked' | 'banned' | 'deleted'

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
  user_type: 'affiliate' | 'regular'
  referral_token: string
  downline_users_count: number
  payout_address: string
  status: UserStatus
  status_reason: string
  created_at: Date
  updated_at: Date
}

export type UserDetail = {
  first_name: string
  last_name: string
  phone_number: string
  profession: string
  earnings: string
  source_of_income: string
  trading_experience: string
  sumsub_email: string
  gender: string
  date_of_birth: string
  country: string
  nationality: string
  address_country: string
  address_postcode: string
  address_town: string
  address_street: string
  address_substreet: string
  address_state: string
}

export type UserInfo = {
  user_detail: UserDetail
} & User

export type LoginResponse = {
  user: User
  token: string
}

type ProceedMfaResponse = {
  user: User
}

type CreateNewMfa = {
  google_secret: string
}

export type KycAccessKey = {
  sucess: boolean
  result: {
    token: string
  }
}

export type ReferralResponse = {
  sucess: boolean
  name: string
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

export type AssetLatestPrices = {
  BCH: string
  BNB: string
  BTC: string
  BUSD: string
  BWG: string
  EOS: string
  ETH: string
  EUR: string
  LINK: string
  LTC: string
  OKB: string
  USD: string
  XLM: string
  XRP: string
}

type DynamicFee = {
  asset_id: number
  fee_percentage: string
  id: number
  minimum_value: string
  created_at: string
  updated_at: string
}

type AssetRates = {
  fee_percentage: string
  amount: string
  rate: string
}

type EstimateFee = {
  dynamic_fee_amount: string
  dynamic_fee_percentage: string
  payment_rate: string
  received_amount: string
  static_fee_amount: string
  total_amount: string
  total_rate: string
  total_fee_amount: string
  usd_total_amount: string
  usd_total_fee: string
  storage_fee_amount: string
  storage_fee_percentage: string
  storage_fee_remaining_days: number
}

type Status = 'init' | 'accepted' | 'rejected' | 'pending'

type PaymentService = {
  status: 'enabled' | 'disabled'
} & Success

type CryptoPaymentData = {
  confirmations: number
  payment_address: string
  recipient: string
  sender: string
  tx_hash: string
  updated_at: string
}
type PaypalPaymentData = {
  id: number
  external_id: string
  status: string
  links: {
    href: string
    rel: 'self' | 'payer-action'
    method: 'GET' | 'POST'
  }[]
}

type Payment<Tdata = null> = {
  id: number
  dynamic_fee_amount: string
  dynamic_fee_percentage: string
  expires_at: string
  paid_amount_number: string
  paid_amount_currency: string
  payment_rate: string
  payment_type: string
  payment_data: CryptoPaymentData & PaypalPaymentData
  received_amount: string
  total_rate: string
  received_amount_number: string
  received_amount_currency: string
  static_fee_amount: string
  status: Status | 'confirmed'
  status_reason: string
  storage_fee_amount: string
  storage_fee_percentage: string
  storage_fee_remaining_days: number
  trade_pair: string
  total_amount: string
  total_fee_amount: string
  usd_paid_amount: string
  usd_total_amount: string
  usd_total_fee: string
  user_id: number
  user_input_amount: string
  created_at: string
  updated_at: string
  transfer: Tdata
  gold_card_package: GoldCardPackage | null
}

type GoldCardPackage = {
  id: number
  is_active: boolean
  title: string
  description: string
  bwg_amount: string
  price_usd: string
  price_eur: string
  package_type: PackageType
}

type BankTransfer = {
  beneficiary_name: string
  beneficiary_account_number: string
  beneficiary_address: string
  bank_aba_routing_number: string
  bank_name: string
  bank_address: string
  bank_swift_code: string
  payment_reference: string
  beneficiary_iban_usd: string
  beneficiary_iban_eur: string
  payment_reference: string
}

export type Transfer = {
  amount: string
  address: string
  confirmations: number
  created_at: string
  id: number
  recipient: string
  sender: string
  status: Status | 'completed'
  status_reason: string
  tx_hash: string
  updated_at: string
  user_id: number
  payment_id: number
}

type TransactionChart = {
  month: number
  data: [
    {
      id: number
      amount: string
    }
  ]
}

type AssetChartItem = {
  timestamp: number
  price: string
}

type OrderHistory = {
  payments: Payment<Transfer>[]
  meta: Meta
}
type Commission = {
  current_balance: string
  total_income: string
  total_payout: string
  total_direct: string
  total_unilevel: string
  updated_at: string
}

type Payout = {
  id: number
  amount: string
  address: string
  confirmations: string
  sender: string
  recipient: string
  tx_hash: string
  status: string
  status_reason: string
  created_at: string
  updated_at: string
}

type CommissionPayout = {
  payout: Payout
}

type ReferralStats = {
  total_amount: string
  referral_id: number
  referral_account_type: string
  referral_status: UserStatus
  referral_joined_at: string
  referral_total_invites: number
  referral_total_regulars: number
  referral_total_affiliates: number
  referral_full_name: string
  referral_email: string
}

type ReferralAccount = {
  referrer_name: string
  previous_referrer_id: number
  referrals_stats: ReferralStats[]
  meta: Meta
}

type PackageType = 'signature' | 'premium' | 'standard' | 'basic'

export type GoldCardPackage = {
  id: number
  is_active: boolean
  title: string
  description: string
  bwg_amount: string
  price_usd: string
  price_eur: string
  package_type: PackageType
}

export type GoldCardAccount = {
  current_balance: string
  total_deposit: string
  total_withdraw: string
  is_active: boolean
  created_at: string
  updated_at: string
}
