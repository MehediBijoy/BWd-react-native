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
