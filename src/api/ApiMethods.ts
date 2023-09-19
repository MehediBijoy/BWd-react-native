import autoBind from 'auto-bind'

import {formatEstimatePay} from 'utils'

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
  AssetProps,
  PaymentProps,
  PaymentQueryProps,
  UserWalletProps,
  EstimateFeeProps,
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
} from './Response'

export default class ApiMethods extends ApiBase {
  constructor(props: ApiBaseProps) {
    super(props)
    autoBind(this)
  }

  async signUpInitial(params: RegistrationProp): Promise<LoginResponse> {
    const {data, headers} = await this.post(
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
    const {data, headers} = await this.post(
      '/auth/login',
      {
        user: userProps,
        mfa_code,
      },
      true
    )
    return {
      user: data?.user,
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
    const {user} = await this.put(`/users/${id}`, {
      mfa_code,
      user: {
        email,
      },
    })
    return user
  }

  async emailConfirm(token: string): Promise<LoginResponse> {
    const {data, headers} = await this.get(
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

  async proceedMfa() {}

  // async proceedMfa({activation, mfa_code}) {
  //   return this.post('/auth/google_mfa', {
  //     user_mfa_session: {activation, mfa_code},
  //   })
  // }

  async getProfile(): Promise<User> {
    const {user} = await this.get('/auth/profile')
    return user
  }

  async getUserInfo(id: number): Promise<UserInfo> {
    const {user} = await this.get(`/users/${id}`)
    return user
  }

  async checkReferral(params: ReferralProps) {
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
    const {user} = await this.post(`/users/${id}/wallet`, params)
    return user
  }

  async walletChangeWithToken(token: string): Promise<Success> {
    return await this.get('users/confirm_wallet_changing', {token})
  }

  async getAssets(): Promise<Asset[]> {
    const {assets} = await this.get('/assets')
    return assets
  }

  async getAssetBySymbol({symbol, params}: AssetProps): Promise<Asset> {
    const {asset} = await this.get(`/assets/${symbol}`, params)
    return asset
  }

  async getDynamicFees(): Promise<DynamicFee[]> {
    const {dynamic_fees} = await this.get('/dynamic_fees')
    return dynamic_fees
  }

  // payments API
  async getEstimateFee(params: EstimateFeeProps): Promise<EstimateFee> {
    const result = await this.get('/payments/estimate_fee', params)
    return formatEstimatePay(result)
  }

  async createPayment(params: PaymentProps): Promise<Payment> {
    const {payment} = await this.post('/payments', {payment: params})
    return payment
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

  async getOrders(): Promise<OrderHistory> {
    const {payments, meta} = await this.get('/payments')
    return {
      data: payments,
      meta: meta,
    }
  }
}
