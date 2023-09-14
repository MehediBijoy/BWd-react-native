import {bsc, bscTestnet} from 'viem/chains'
import {useQuery} from '@tanstack/react-query'

import {CHAIN} from 'config/environments'

import useClient from './useClient'

const useChain = () => {
  const {publicClient} = useClient()
  const chains = [bsc, bscTestnet]
  const {data, refetch, isLoading} = useQuery<number>({
    queryKey: ['chain'],
    queryFn: async () => await publicClient.getChainId(),
    enabled: Boolean(publicClient),
  })

  return {
    chian: chains.find(item => item.id === data),
    isConnected: data === CHAIN,
    refetchChain: refetch,
    isLoading,
  }
}

export default useChain
