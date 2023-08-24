import autoBind from 'auto-bind'
import axios, {AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios'

import {ApiErrorResponse} from '../Errors'

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

    this.axiosClient.interceptors.response.use(
      response => response,
      (error: AxiosError<ApiErrorResponse>) => {
        if (!error.response) {
          throw new Error('Unhandled error happened...')
        }

        const {status, message} = error
        const errorData = error.response?.data?.error

        if (!errorData) {
          throw new Error(`${message} (${status})`)
        }

        const codes = ['002', '003', '004']
        if (codes.includes(errorData.code)) {
          this.onAction && this.onAction()
        }
        throw errorData
      }
    )
    autoBind(this)
  }

  private async request(options: AxiosRequestConfig, fullResponse: boolean) {
    const response = await this.axiosClient.request(options)
    if (fullResponse) return response
    return response.data
  }

  async get(url: string, params?: object, fullResponse: boolean = false, others?: object) {
    return this.request({url, method: 'get', params, ...others}, fullResponse)
  }

  async post(url: string, data?: object, fullResponse: boolean = false, others?: object) {
    return this.request({url, method: 'post', data, ...others}, fullResponse)
  }

  async put(url: string, data?: object, fullResponse: boolean = false, others?: object) {
    return this.request({url, method: 'put', data, ...others}, fullResponse)
  }

  async delete(url: string, params?: object, fullResponse: boolean = false, others?: object) {
    return this.request({url, method: 'delete', params, ...others}, fullResponse)
  }
}
