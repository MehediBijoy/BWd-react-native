import {useMemo} from 'react'

import ApiMethods from 'api'
import {BASE_URL} from 'config/environments'

import useAuthToken from './useAuthToken'
import useOnUnauthorized from './useOnUnauthorized'

const useApi = () => {
  const unAuthorized = useOnUnauthorized()
  const token = useAuthToken(state => state.token)

  return useMemo(
    () =>
      new ApiMethods({
        baseURL: BASE_URL,
        timeout: 60000,
        onAction: unAuthorized,
        commonHeaders: token
          ? {
              Authorization: token,
            }
          : {},
      }),
    [token, unAuthorized]
  )
}

export default useApi
