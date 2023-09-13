import autoBind from 'auto-bind'

import {formatEstimatePay} from 'utils'

import {
  LoginProps,
  RegistrationProp,
  EmailProps,
  ChangePasswordProps,
  ReferralProps,
  TransactionChartProps,
  DashboardChartProps,
  AssetProps,
  PaymentProps,
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
  AssetChartItem,
  TransactionChart,
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

  async passwordResetConfirm({code, password, password_confirmation}: ChangePasswordProps) {
    return this.put('/auth/password', {
      user: {
        reset_password_token: code,
        password,
        password_confirmation,
      },
    })
  }

  async getProfile(): Promise<User> {
    const {user} = await this.get('/auth/profile')
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
  async getEstimateFee(params: PaymentProps): Promise<EstimateFee> {
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
}
