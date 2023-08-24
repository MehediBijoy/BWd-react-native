import {useCallback} from 'react'
import {useQueryClient} from '@tanstack/react-query'

import useAuthToken from './useAuthToken'

const useOnUnauthorized = () => {
  const queryClient = useQueryClient()
  const {setToken} = useAuthToken()

  return useCallback(() => {
    setToken(undefined)
    queryClient.clear()
  }, [setToken, queryClient])
}

export default useOnUnauthorized
