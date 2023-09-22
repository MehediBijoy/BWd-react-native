import React from 'react'
import {QueryKey, useQueryClient} from '@tanstack/react-query'

import useBlockNumber from './useBlockNumber'

const useInvalidateOnBlock = ({enabled, queryKey}: {enabled?: boolean; queryKey: QueryKey}) => {
  const queryClient = useQueryClient()

  const onBlock = React.useCallback(
    () => queryClient.invalidateQueries({queryKey}, {cancelRefetch: false}),
    [queryClient, queryKey]
  )

  useBlockNumber({
    enabled,
    onBlock: enabled ? onBlock : undefined,
  })
}

export default useInvalidateOnBlock
