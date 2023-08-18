import {useMemo} from 'react'

import ApiMethods from 'api'
import {BASE_URL} from 'config/environments'

import useAuthToken from './useAuthToken'

const useApi = () => {
  const token = useAuthToken(state => state.token)
  return useMemo(
    () =>
      new ApiMethods({
        baseURL: BASE_URL,
        timeout: 60000,
        commonHeaders: token
          ? {
              Authorization: token,
            }
          : {},
      }),
    [token]
  )
}

export default useApi
