import React from 'react'
import {useQuery, useQueryClient, UseQueryOptions} from '@tanstack/react-query'

import {cacheKey} from 'api'
import {User} from 'api/Response'
import {useAuthToken, useApi} from 'hooks/api'

import usePlatform from './usePlatform'

type ProfileOptions = Omit<UseQueryOptions<User>, 'queryFn' | 'queryKey'>

const useProfile = (props?: ProfileOptions) => {
  const api = useApi()
  const {token} = useAuthToken()
  const {hasHydrate} = usePlatform()
  const queryClient = useQueryClient()

  const {data, isLoading, isRefetching, refetch} = useQuery<User>({
    queryKey: [cacheKey.profile],
    queryFn: api.getProfile,
    refetchOnMount: false,
    enabled: Boolean(!!token && hasHydrate),
    ...props,
  })

  const setProfile = React.useCallback(
    (newData: User) => queryClient.setQueryData([cacheKey.profile], newData),
    [queryClient]
  )

  return {profile: data, refetch, isRefetching, isLoading, setProfile}
}

export default useProfile
