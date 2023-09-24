import {useCallback} from 'react'
import {useQueryClient} from '@tanstack/react-query'

import {useDisconnect} from 'hooks/crypto'

import useAuthToken from './useAuthToken'

const useOnUnauthorized = () => {
  const queryClient = useQueryClient()
  const {setToken} = useAuthToken()
  const {disconnect, isDisconnected} = useDisconnect()

  return useCallback(() => {
    setToken(undefined)
    queryClient.clear()
    if (!isDisconnected) disconnect()
  }, [setToken, queryClient])
}

export default useOnUnauthorized
