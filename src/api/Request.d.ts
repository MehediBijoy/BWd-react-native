export type LoginProps = {mfa_code?: string; email: string; password: string}
export type RegistrationProp = {
  email: string
  password: string
  password_confirmation: string
  token?: string
  user_detail_attributes: {
    profession: string
    source_of_income: string
    earnings?: string
    trading_experience?: string
  }
}
export type EmailProps = {
  email: string
}

export type ChangePasswordFormProps = {
  password: string
  password_confirmation: string
}

export type ResetPasswordProps = {
  code: string
} & ChangePasswordFormProps

export type ChangePasswordProps = {
  mfa_code?: string
  user: {
    current_password: string
  } & ChangePasswordFormProps
}

export type ReferralProps = {
  [token: string]: string
}

export type AssetProps = {
  symbol: string
  params?: object
}

export type EstimateFeeProps = {
  asset: string
  target_asset: string
  amount: number | string
  in_base?: boolean
  payment_type?: string
}

export type PaymentProps = {
  success_url: string
  error_url: string
} & EstimateFeeProps

export type ChangeEmailProps = {
  id: number
  email: string
  mfa_code?: string
}

export type TransactionChartProps = {
  period_type: string
  period_numbers: number
}

export type DashboardChartProps = {
  symbol: string
  days: number
  currency: string
}

export type PaymentQueryProps = {
  limit: number
  page: number
  status: string
  sort_by: string
  sort_order: string
  q: string
  user_id: string
}

export type UserWalletProps = {
  id: number
  wallet_address: string
  wallet_type: 'walletConnect'
  mfa_code?: string
}

type ProceedMfaProps = {
  activation: boolean
  mfa_code: string
}
