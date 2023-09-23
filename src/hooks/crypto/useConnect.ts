import {useQueryClient, useMutation} from '@tanstack/react-query'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

const useConnect = () => {
  const queryClient = useQueryClient()
  const {isConnected, provider, open} = useWalletConnectModal()

  const {mutate, isLoading} = useMutation({
    mutationFn: async () => {
      open()
      return await provider?.connect({})
    },
    onError: () => console.log('cancel'),
    onSuccess: () => console.log('connected'),
  })

  return {isLoading, connect: mutate}
}

export default useConnect
