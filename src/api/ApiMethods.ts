import autoBind from 'auto-bind'

import ApiBase, {ApiBaseProps} from './ApiAbstractions/ApiBase'

export default class ApiMethods extends ApiBase {
  constructor(props: ApiBaseProps) {
    super(props)
    autoBind(this)
  }

  async login({mfa_code, ...userProps}: {mfa_code?: string; email: string; password: string}) {
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

  async getProfile() {
    return this.get('/profile')
  }

  async getHealth() {
    return await this.get('/health_check')
  }
}
