export type LoginRequestProps = {
  mfa_code?: string
  email: string
  password: string
}

export type EmailProps = {
  email: string
}

export type ReferralProps = {
  [token: string]: string
}
