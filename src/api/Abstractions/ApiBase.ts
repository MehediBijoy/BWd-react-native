import autoBind from 'auto-bind'
import axios, {AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios'

import {ApiErrorResponse} from '../Errors'

export type ApiBaseProps = {
  baseURL: string
  commonHeaders: {
    Authorization?: string
  }
  onAction?: () => void
  timeout?: number
}

type OtherProps = Omit<AxiosRequestConfig, 'url' | 'method'>
type GetOrDeleteOtherProps = Omit<OtherProps, 'params'>
type PostOrPutOtherProps = Omit<OtherProps, 'data'>

export default class ApiBas {
  private axiosClient: AxiosInstance

  constructor({baseURL, commonHeaders, onAction, timeout = 4000}: ApiBaseProps) {
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

        const {message} = error
        const errorData = error.response?.data?.error

        if (!errorData) {
          throw new Error(message)
        }

        const codes = ['002', '003', '004']
        if (codes.includes(errorData.code)) {
          onAction && onAction()
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

  async get<Tdata>(url: string): Promise<Tdata>
  async get<Tdata>(url: string, params: object): Promise<Tdata>
  async get<Tdata>(url: string, params: object, fullResponse: false): Promise<Tdata>
  async get<Tdata>(url: string, params: object, fullResponse: true): Promise<AxiosResponse<Tdata>>
  async get<Tdata>(
    url: string,
    params: object,
    fullResponse: false,
    others: GetOrDeleteOtherProps
  ): Promise<Tdata>
  async get<Tdata>(
    url: string,
    params: object,
    fullResponse: true,
    others: GetOrDeleteOtherProps
  ): Promise<AxiosResponse<Tdata>>
  async get<Tdata>(
    url: string,
    params?: object,
    fullResponse = false,
    others?: GetOrDeleteOtherProps
  ): Promise<Tdata | AxiosResponse<Tdata>> {
    return this.request({url, method: 'get', params, ...others}, fullResponse)
  }

  async post<Tdata>(url: string): Promise<Tdata>
  async post<Tdata>(url: string, data: object): Promise<Tdata>
  async post<Tdata>(url: string, data: object, fullResponse: false): Promise<Tdata>
  async post<Tdata>(url: string, data: object, fullResponse: true): Promise<AxiosResponse<Tdata>>
  async post<Tdata>(
    url: string,
    data: object,
    fullResponse: false,
    others: PostOrPutOtherProps
  ): Promise<Tdata>
  async post<Tdata>(
    url: string,
    data: object,
    fullResponse: true,
    others: PostOrPutOtherProps
  ): Promise<AxiosResponse<Tdata>>
  async post<Tdata>(
    url: string,
    data?: object,
    fullResponse: boolean = false,
    others?: PostOrPutOtherProps
  ): Promise<Tdata | AxiosResponse<Tdata>> {
    return this.request({url, method: 'post', data, ...others}, fullResponse)
  }

  async put<Tdata>(url: string): Promise<Tdata>
  async put<Tdata>(url: string, data: object): Promise<Tdata>
  async put<Tdata>(url: string, data: object, fullResponse: false): Promise<Tdata>
  async put<Tdata>(url: string, data: object, fullResponse: true): Promise<AxiosResponse<Tdata>>
  async put<Tdata>(
    url: string,
    data: object,
    fullResponse: false,
    others: PostOrPutOtherProps
  ): Promise<Tdata>
  async put<Tdata>(
    url: string,
    data: object,
    fullResponse: true,
    others: PostOrPutOtherProps
  ): Promise<AxiosResponse<Tdata>>
  async put<Tdata>(
    url: string,
    data?: object,
    fullResponse: boolean = false,
    others?: PostOrPutOtherProps
  ): Promise<Tdata | AxiosResponse<Tdata>> {
    return this.request({url, method: 'put', data, ...others}, fullResponse)
  }

  async delete<Tdata>(url: string): Promise<Tdata>
  async delete<Tdata>(url: string, params: object): Promise<Tdata>
  async delete<Tdata>(url: string, params: object, fullResponse: false): Promise<Tdata>
  async delete<Tdata>(
    url: string,
    params: object,
    fullResponse: true
  ): Promise<AxiosResponse<Tdata>>
  async delete<Tdata>(
    url: string,
    params: object,
    fullResponse: false,
    others: GetOrDeleteOtherProps
  ): Promise<Tdata>
  async delete<Tdata>(
    url: string,
    params: object,
    fullResponse: true,
    others: GetOrDeleteOtherProps
  ): Promise<AxiosResponse<Tdata>>
  async delete<Tdata>(
    url: string,
    params?: object,
    fullResponse = false,
    others?: GetOrDeleteOtherProps
  ): Promise<Tdata | AxiosResponse<Tdata>> {
    return this.request({url, method: 'delete', params, ...others}, fullResponse)
  }
}
