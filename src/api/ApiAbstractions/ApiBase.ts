import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'

import {BASE_URL} from '../../config/environments'

interface IApiBase {
  commonHeaders: object
  onAction: () => void
  timeout?: number
}

export default class ApiBase {
  private onAction: () => void
  private axiosClient: AxiosInstance

  constructor({commonHeaders, onAction, timeout = 4000}: IApiBase) {
    this.onAction = onAction
    this.axiosClient = axios.create({
      baseURL: BASE_URL,
      timeout,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...commonHeaders,
      },
      responseType: 'json',
    })
  }

  async request<T extends AxiosRequestConfig>(
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
