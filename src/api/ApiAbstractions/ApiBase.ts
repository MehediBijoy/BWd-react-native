import autoBind from 'auto-bind'
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'

export type ApiBaseProps = {
  baseURL: string
  commonHeaders: {
    Authorization?: string
  }
  onAction?: () => void
  timeout?: number
}

export default class ApiBas {
  private onAction
  private axiosClient: AxiosInstance

  constructor({baseURL, commonHeaders, onAction, timeout = 4000}: ApiBaseProps) {
    this.onAction = onAction
    this.axiosClient = axios.create({
      baseURL: baseURL,
      timeout,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...commonHeaders,
      },
      responseType: 'json',
    })
    autoBind(this)
  }

  private async request<T extends AxiosRequestConfig>(
    options: T,
    fullResponse: boolean
  ): Promise<AxiosResponse> {
    const response = await this.axiosClient.request(options)
    if (fullResponse) return response
    return response.data
  }

  async get(
    url: string,
    params?: object,
    fullResponse: boolean = false,
    others?: object
  ): Promise<AxiosResponse> {
    return this.request({url, method: 'get', params, ...others}, fullResponse)
  }

  async post(
    url: string,
    data?: object,
    fullResponse: boolean = false,
    others?: object
  ): Promise<AxiosResponse> {
    return this.request({url, method: 'post', data, ...others}, fullResponse)
  }

  async put(
    url: string,
    data?: object,
    fullResponse: boolean = false,
    others?: object
  ): Promise<AxiosResponse> {
    return this.request({url, method: 'put', data, ...others}, fullResponse)
  }

  async delete(
    url: string,
    params?: object,
    fullResponse: boolean = false,
    others?: object
  ): Promise<AxiosResponse> {
    return this.request({url, method: 'delete', params, ...others}, fullResponse)
  }
}
