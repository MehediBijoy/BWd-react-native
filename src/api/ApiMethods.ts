import autoBind from 'auto-bind'

import * as Req from './Request'
import * as Res from './Response'
import ApiBase, {ApiBaseProps} from './ApiAbstractions/ApiBase'

export default class ApiMethods extends ApiBase {
  constructor(props: ApiBaseProps) {
    super(props)
    autoBind(this)
  }

  async signUpInitial(params: Req.RegistrationProp): Res.LoginResponse {
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

  async login({mfa_code, ...userProps}: Req.LoginProps): Res.LoginResponse {
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
  async passwordResetRequest({email}: Req.EmailProps) {
    return this.post('/auth/password', {
      user: {
        email,
      },
    })
  }

  async passwordResetConfirm({code, password, password_confirmation}: Req.ChangePasswordProps) {
    return this.put('/auth/password', {
      user: {
        reset_password_token: code,
        password,
        password_confirmation,
      },
    })
  }

  async getProfile(): Promise<Res.User> {
    const {user} = await this.get('/auth/profile')
    return user
  }

  async checkReferral(params: Req.ReferralProps) {
    return await this.get('/users/check_referral', params)
  }

  async resendEmailConfirmation({email}: Req.EmailProps) {
    return this.post('/auth/confirmation', {
      user: {
        email,
      },
    })
  }
}
