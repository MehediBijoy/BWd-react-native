import React from 'react'
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

import {CHAIN} from 'config/environments'
import {chain} from 'constants/wallet.config'

import useClient from './useClient'

const useChain = () => {
  const queryClient = useQueryClient()
  const {provider} = useWalletConnectModal()
  const {publicClient, walletClient} = useClient()

  const queryKey = ['cryptoChain']

  const {data: chainId, isLoading: isChainLoading} = useQuery<number>({
    queryKey,
    queryFn: async () => await publicClient.getChainId(),
    enabled: !!publicClient,
  })

  const chainChange = (id: string) => queryClient.setQueryData(queryKey, parseInt(id))

  const watchChainId = () => {
    provider?.on('chainChanged', chainChange)
    return () => provider?.removeListener('chainChanged', chainChange)
  }

  React.useEffect(() => {
    if (!provider) return
    const unwatch = watchChainId()
    return unwatch
  }, [provider])

  const switchNetwork = () => walletClient.switchChain({id: CHAIN})
  const setNetworkFn = () => walletClient.addChain({chain: chain})

  const {mutate, isLoading: isSwitchLoading} = useMutation({
    mutationFn: async () => {
      const timeout = new Promise((_, rejected) =>
        setTimeout(() => rejected('Network switching timeout'), 10000)
      )
      return await Promise.race([setNetworkFn(), timeout])
    },
    onSuccess: switchNetwork,
  })

  return {
    chainId,
    isSwitchLoading,
    isChainLoading,
    switchNetwork,
    setNetwork: mutate,
    isConnected: Boolean(chainId && chainId === CHAIN),
  }
}

export default useChain
