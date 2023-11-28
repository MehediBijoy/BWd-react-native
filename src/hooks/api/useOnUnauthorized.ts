import {useCallback} from 'react'
import {useQueryClient} from '@tanstack/react-query'

import {useDisconnect} from 'hooks/crypto'

import useAuthToken from './useAuthToken'

const useOnUnauthorized = () => {
  const queryClient = useQueryClient()
  const {setToken} = useAuthToken()
  const {disconnect, isDisconnected} = useDisconnect()

  return useCallback(() => {
    queryClient.clear()
    setToken(undefined)
    if (!isDisconnected) disconnect()
  }, [setToken, queryClient, isDisconnected, disconnect])
}

export default useOnUnauthorized
