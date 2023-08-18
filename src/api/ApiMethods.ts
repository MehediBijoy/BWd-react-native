import autoBind from 'auto-bind'

import ApiBase, {ApiBaseProps} from './ApiAbstractions/ApiBase'

export default class ApiMethods extends ApiBase {
  constructor(props: ApiBaseProps) {
    super(props)
    autoBind(this)
  }

  async getProfile() {
    return this.get('/profile')
  }

  async getHealth() {
    return await this.get('/health_check')
  }
}
