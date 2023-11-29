import {useMemo} from 'react'

import ApiMethods from 'api'
import {useLocales} from 'hooks/states'
import {usePlatform} from 'hooks/helper'

import useAuthToken from './useAuthToken'
import useOnUnauthorized from './useOnUnauthorized'

const useApi = () => {
  const {API_URL} = usePlatform()
  const {currentLang} = useLocales()
  const unAuthorized = useOnUnauthorized()
  const token = useAuthToken(state => state.token)

  return useMemo(
    () =>
      new ApiMethods({
        baseURL: API_URL,
        timeout: 60000,
        onAction: unAuthorized,
        commonHeaders: {
          Authorization: token,
          lang: currentLang,
        },
      }),
    [API_URL, currentLang, token, unAuthorized]
  )
}

export default useApi
