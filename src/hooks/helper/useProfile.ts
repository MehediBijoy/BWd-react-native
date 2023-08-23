import React from 'react'
import {useQuery, useQueryClient, UseQueryOptions} from '@tanstack/react-query'

import {cacheKey} from 'api'
import {User} from 'api/Response'
import {useAuthToken, useApi} from 'hooks/api'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ProfileOptions = Omit<UseQueryOptions, 'queryFn'>

const useProfile = () => {
  const api = useApi()
  const {token} = useAuthToken()
  const queryClient = useQueryClient()

  const {data, isLoading, isRefetching, refetch} = useQuery({
    queryKey: [cacheKey.profile],
    queryFn: api.getProfile,
    enabled: !!token,
  })

  const setProfile = React.useCallback(
    (newData: User) => queryClient.setQueryData([cacheKey.profile], newData),
    [queryClient]
  )

  return {profile: data, refetch, isRefetching, isLoading, setProfile}
}

export default useProfile
