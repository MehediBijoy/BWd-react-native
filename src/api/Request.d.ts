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

export type ChangeEmailProps = {
  id: number
  email: string
  mfa_code?: string
}
