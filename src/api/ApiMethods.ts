import autoBind from 'auto-bind'

import * as Req from './Request'
import * as Res from './Response'
import ApiBase, {ApiBaseProps} from './ApiAbstractions/ApiBase'

export default class ApiMethods extends ApiBase {
  constructor(props: ApiBaseProps) {
    super(props)
    autoBind(this)
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

  async getProfile(): Promise<Res.User> {
    return this.get('/profile')
  }

  async getHealth() {
    return await this.get('/health_check')
  }
}
