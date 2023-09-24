import {useMutation} from '@tanstack/react-query'

import useWallet from './useWallet'

const useDisconnect = () => {
  const {provider, isConnected} = useWallet()

  const mutationFn = async () => await provider?.disconnect()

  const {isLoading, mutateAsync} = useMutation({mutationFn})

  return {isDisconnected: !isConnected, isLoading, disconnect: mutateAsync}
}

export default useDisconnect
