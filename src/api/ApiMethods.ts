import autoBind from 'auto-bind'

import {formatEstimatePay} from 'utils/response'

import {
  LoginProps,
  RegistrationProp,
  EmailProps,
  ResetPasswordProps,
  ReferralProps,
  ChangeEmailProps,
  ChangePasswordProps,
  TransactionChartProps,
  DashboardChartProps,
  PaymentProps,
  UserWalletProps,
  EstimateFeeProps,
  ProceedMfaProps,
  PayoutCommissionProps,
  UserDeleteProps,
  AssetsRateProps,
  SurveySubmitProps,
  CheckSurveyStatusProps,
  GoldCardProps,
} from './Request'
import ApiBase, {ApiBaseProps} from './Abstractions/ApiBase'
import {
  LoginResponse,
  KycAccessKey,
  User,
  Success,
  Asset,
  DynamicFee,
  EstimateFee,
  Payment,
  UserInfo,
  AssetChartItem,
  TransactionChart,
  OrderHistory,
  CreateNewMfa,
  ProceedMfaResponse,
  Commission,
  CommissionPayout,
  ReferralAccount,
  PaymentService,
  AssetLatestPrices,
  AssetRates,
  BankTransfer,
  ReferralResponse,
  GoldCardPackage,
  GoldCardAccount,
} from './Response'

export default class ApiMethods extends ApiBase {
  constructor(props: ApiBaseProps) {
    super(props)
    autoBind(this)
  }

  async signUpInitial(params: RegistrationProp): Promise<LoginResponse> {
    const {data, headers} = await this.post<{user: User}>(
      '/auth/signup',
      {
        user: params,
      },
      true
    )
    return {
      user: data.user,
      token: headers.authorization,
    }
  }

  async login({mfa_code, ...userProps}: LoginProps): Promise<LoginResponse> {
    const {data, headers} = await this.post<{user: User}>(
      '/auth/login',
      {
        user: userProps,
        mfa_code,
      },
      true
    )
    return {
      user: data.user,
      token: headers.authorization,
    }
  }

  async passwordResetRequest({email}: EmailProps): Promise<Success> {
    return this.post('/auth/password', {
      user: {
        email,
      },
    })
  }

  async passwordResetConfirm({code, password, password_confirmation}: ResetPasswordProps) {
    return this.put('/auth/password', {
      user: {
        reset_password_token: code,
        password,
        password_confirmation,
      },
    })
  }

  async changePassword(props: ChangePasswordProps): Promise<Success> {
    return this.put('/auth/signup', props)
  }

  async changeEmail({id, email, mfa_code}: ChangeEmailProps): Promise<UserInfo> {
    const {user} = await this.put<{user: UserInfo}>(`/users/${id}`, {
      mfa_code,
      user: {
        email,
      },
    })
    return user
  }

  async emailConfirm(token: string): Promise<LoginResponse> {
    const {data, headers} = await this.get<{user: User}>(
      '/auth/confirmation',
      {
        confirmation_token: token,
      },
      true
    )

    return {
      user: data.user,
      token: headers.authorization,
    }
  }

  async createNewMfa(): Promise<CreateNewMfa> {
    return await this.get('/auth/google_mfa/new')
  }

  async proceedMfa(params: ProceedMfaProps): Promise<ProceedMfaResponse> {
    return this.post('/auth/google_mfa', {
      user_mfa_session: params,
    })
  }

  async getProfile(): Promise<User> {
    const {user} = await this.get<{user: User}>('/auth/profile')
    return user
  }

  async getUserInfo(id: number): Promise<UserInfo> {
    const {user} = await this.get<{user: UserInfo}>(`/users/${id}`)
    return user
  }

  async deleteUser({id, password}: UserDeleteProps): Promise<Success> {
    return await this.post(`/users/${id}/request_deletion`, {password})
  }

  async checkReferral(params: ReferralProps): Promise<ReferralResponse> {
    return await this.get('/users/check_referral', params)
  }

  async resendEmailConfirmation({email}: EmailProps) {
    return this.post('/auth/confirmation', {
      user: {
        email,
      },
    })
  }

  async getKycAccessToken(): Promise<KycAccessKey> {
    return this.post('/sumsub/access_token?levelName=basic-kyc')
  }

  async userWallet({id, ...params}: UserWalletProps): Promise<User> {
    const {user} = await this.post<{user: User}>(`/users/${id}/wallet`, params)
    return user
  }

  async walletChangeWithToken(token: string): Promise<Success> {
    return await this.get('users/confirm_wallet_changing', {token})
  }

  async getAssets(): Promise<Asset[]> {
    const {assets} = await this.get<{assets: Asset[]}>('/assets')
    return assets
  }

  async getAssetBySymbol(symbol: string): Promise<Asset> {
    const {asset} = await this.get<{asset: Asset}>(`/assets/${symbol}`)
    return asset
  }

  async getAssetLatestPrices(currency: string): Promise<AssetLatestPrices> {
    return await this.get(`/assets/latest?vs_currency=${currency}`)
  }

  async getDynamicFees(): Promise<DynamicFee[]> {
    const {dynamic_fees} = await this.get<{dynamic_fees: DynamicFee[]}>('/dynamic_fees')
    return dynamic_fees
  }

  async getAssetRates(params: AssetsRateProps): Promise<AssetRates[]> {
    return await this.get('/payments/rates', params)
  }

  // payments API
  async getEstimateFee(params: EstimateFeeProps): Promise<EstimateFee> {
    const result = await this.get<EstimateFee>('/payments/estimate_fee', params)
    return formatEstimatePay(result)
  }

  async createPayment(params: PaymentProps): Promise<Payment> {
    const {payment} = await this.post<{payment: Payment}>('/payments', {payment: params})
    return payment
  }

  async getCurrentPayment(): Promise<Payment> {
    return await this.get('/payments/current')
  }

  async paypalCapture(id: number): Promise<Success> {
    return await this.post(`/payments/${id}/capture`)
  }

  async getBankDetails(id: number, region: string): Promise<BankTransfer> {
    return await this.get(`/payments/${id}/bank_details`, {region})
  }

  async getTransferChart(params: TransactionChartProps): Promise<TransactionChart[]> {
    return await this.get('transfers/marimekko_chart', params)
  }

  async getChartSymbol({
    symbol,
    days,
    currency,
    ...rest
  }: DashboardChartProps): Promise<AssetChartItem[]> {
    let points = days * 24 * 60
    return await this.get(`/assets/${symbol}/chart`, {
      period: days,
      points,
      vs_currency: currency,
      ...rest,
    })
  }

  async checkPaymentService(): Promise<PaymentService> {
    return await this.get('/payments/status')
  }

  async getOrders(): Promise<OrderHistory> {
    return await this.get<OrderHistory>('/payments', {page: 1, limit: 100})
  }

  async getUserAffiliateCommission(id: number): Promise<Commission> {
    const {commissions_account} = await this.get<{commissions_account: Commission}>(
      `/users/${id}/commissions_account`
    )
    return commissions_account
  }

  async commissionPayout(params: PayoutCommissionProps): Promise<CommissionPayout> {
    return await this.post('/payouts', params)
  }

  async getReferralStats(id: number): Promise<ReferralAccount> {
    return await this.get<ReferralAccount>(`/users/${id}/referrals_stats`, {
      page: 1,
      limit: 100,
    })
  }

  async enableAffiliate(id: number): Promise<User> {
    const {user} = await this.post<{user: User}>(`/users/${id}/enable_affiliate`)
    return user
  }

  async surveySubmit({id, ...params}: SurveySubmitProps): Promise<Success> {
    return this.post(`/users/${id}/survey`, params)
  }

  async checkSurveyStatus({id, ...params}: CheckSurveyStatusProps): Promise<{status: string}> {
    return this.get(`/users/${id}/survey_status`, params)
  }

  async getGoldCardPackages(): Promise<GoldCardPackage[]> {
    const {gold_card_packages} = await this.get<{gold_card_packages: GoldCardPackage[]}>(
      '/gold_card_packages'
    )
    return gold_card_packages
  }

  async getGoldCardAccount(): Promise<GoldCardAccount> {
    const {gold_card_accounts} = await this.get<{gold_card_accounts: GoldCardAccount[]}>(
      `/gold_card_accounts`
    )
    return gold_card_accounts[0]
  }

  async goldCardPurchase({id, asset, type}: GoldCardProps): Promise<Payment> {
    const {payment} = await this.post<{payment: Payment}>(`/gold_card_packages/${id}/purchase`, {
      asset,
      type,
    })
    return payment
  }
}
