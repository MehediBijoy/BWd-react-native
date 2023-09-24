import {useMutation} from '@tanstack/react-query'

import {chain} from 'constants/wallet.config'

import useClient from './useClient'

const useNetwork = () => {
  const {walletClient} = useClient()

  const switchNetwork = () => walletClient.switchChain({id: chain.id})
  const setNetworkFn = () => walletClient.addChain({chain: chain})

  const {mutate, isLoading: isSwitchLoading} = useMutation({
    mutationFn: async () => {
      const timeout = new Promise((_, rejected) =>
        setTimeout(() => rejected('Network switching timeout'), 15000)
      )
      return await Promise.race([setNetworkFn(), timeout])
    },
    onSuccess: switchNetwork,
  })

  return {
    isSwitchLoading,
    switchNetwork,
    setNetwork: mutate,
  }
}

export default useNetwork
