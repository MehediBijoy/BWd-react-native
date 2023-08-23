import autoBind from 'auto-bind'

import * as Types from './ApiMethodRequest.types'
import ApiBase, {ApiBaseProps} from './ApiAbstractions/ApiBase'

export default class ApiMethods extends ApiBase {
  constructor(props: ApiBaseProps) {
    super(props)
    autoBind(this)
  }

  async login({mfa_code, ...userProps}: Types.LoginRequestProps) {
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
  async passwordResetRequest({email}: Types.EmailProps) {
    return this.post('/auth/password', {
      user: {
        email,
      },
    })
  }

  async passwordResetConfirm({token: reset_password_token, password, password_confirmation}: any) {
    return this.put('/auth/password', {
      user: {
        reset_password_token,
        password,
        password_confirmation,
      },
    })
  }

  async getProfile() {
    return this.get('/profile')
  }

  async checkReferral(params: Types.ReferralProps) {
    return await this.get('/users/check_referral', params)
  }

  async resendEmailConfirmation({email}: Types.EmailProps) {
    return this.post('/auth/confirmation', {
      user: {
        email,
      },
    })
  }
}
