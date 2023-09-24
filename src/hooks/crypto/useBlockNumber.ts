import * as React from 'react'
import {GetBlockNumberReturnType} from 'viem'
import {useQueryClient, useQuery, UseQueryOptions} from '@tanstack/react-query'

import useClient from './useClient'

export type UseBlockNumber = {
  onBlock?: (blockNumber: bigint) => void
  watch?: boolean
} & Omit<UseQueryOptions<GetBlockNumberReturnType>, 'queryFn' | 'queryKey'>

const useBlockNumber = ({
  cacheTime = 0,
  enabled = true,
  watch = false,
  onBlock,
  ...restOptions
}: UseBlockNumber) => {
  const {publicClient} = useClient()
  const queryClient = useQueryClient()

  const queryKey = ['blockNumber'] as const
  const queryFn = () => publicClient.getBlockNumber()

  React.useEffect(() => {
    if (!enabled) return
    if (!watch && !onBlock) return

    const unwatch = publicClient.watchBlockNumber({
      onBlockNumber: blockNumber => {
        if (watch) queryClient.setQueryData(queryKey, blockNumber)
        if (onBlock) onBlock(blockNumber)
      },
      emitOnBegin: true,
    })
    return unwatch
  }, [onBlock, publicClient, watch, enabled])

  return useQuery<GetBlockNumberReturnType>({
    queryKey,
    queryFn,
    cacheTime,
    enabled,
    ...restOptions,
  })
}

export default useBlockNumber
