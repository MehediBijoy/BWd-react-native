import autoBind from 'auto-bind'

import {
  LoginProps,
  RegistrationProp,
  EmailProps,
  ChangePasswordProps,
  ReferralProps,
} from './Request'
import {LoginResponse, KycAccessKey, User} from './Response'
import ApiBase, {ApiBaseProps} from './ApiAbstractions/ApiBase'

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

  async passwordResetRequest({email}: EmailProps) {
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
}
