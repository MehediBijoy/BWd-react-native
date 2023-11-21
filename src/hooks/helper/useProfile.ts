import React from 'react'
import {useQuery, useQueryClient, UseQueryOptions} from '@tanstack/react-query'

import {cacheKey} from 'api'
import {User} from 'api/Response'
import {useAuthToken, useApi} from 'hooks/api'

import usePlatform from './usePlatform'

type ProfileOptions = Omit<UseQueryOptions<User>, 'queryFn' | 'queryKey'>

const useProfile = (props?: ProfileOptions) => {
  const api = useApi()
  const {hasHydrate} = usePlatform()
  const queryClient = useQueryClient()
  const {hasHydrate: tokenHasHydrate} = useAuthToken()

  const {data, isLoading, isRefetching, refetch, fetchStatus} = useQuery<User>({
    queryKey: [cacheKey.profile],
    queryFn: api.getProfile,
    refetchOnMount: false,
    enabled: hasHydrate && tokenHasHydrate,
    ...props,
  })

  const setProfile = React.useCallback(
    (newData: User) => queryClient.setQueryData([cacheKey.profile], newData),
    [queryClient]
  )

  return {
    profile: data,
    refetch,
    isRefetching,
    isLoading: isLoading && fetchStatus !== 'idle',
    setProfile,
  }
}

export default useProfile
