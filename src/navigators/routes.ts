export type RouteStack = {
  Login: undefined
  ResetPassword: undefined
  ResetEmailVerification: undefined
  ResetEmailConfirmation: undefined
  ChangePassword: {code: string}

  RegistrationProgress: undefined
  RegistrationForm: {
    token: string
    platform: string
    user?: string
  }
  RegistrationEmailConfirm: undefined
  RegistrationKycProcess: undefined
  RegistrationSuccess: undefined

  DrawerComponents: undefined
  TabNavigation: undefined
  Home: undefined
  Purchase: undefined
  CryptoPayment: undefined
  OrderSummary: undefined
  PaymentInformation: undefined
  Transactions: undefined
  Notifications: undefined
  Settings: undefined
  Affiliates: undefined
  GoldCard: undefined

  ProfileEmailChange: undefined
  ProfilePasswordChange: undefined
  ProfileMFA: undefined
  DeleteAccount: undefined
  ProfileBecomeAffiliate: undefined
  DownLine: undefined
}
