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

export type ChangePasswordProps = {
  code: string
  password: string
  password_confirmation: string
}

export type ChangePasswordFormProps = {
  password: string
  password_confirmation: string
}

export type ReferralProps = {
  [token: string]: string
}

export type AssetProps = {
  symbol: string
  params?: object
}

export type PaymentProps = {
  asset: string
  target_asset: string
  amount: number | string
  in_base?: boolean
  payment_type?: string
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
