import React from 'react'
import {useQuery, useQueryClient, UseQueryOptions} from '@tanstack/react-query'

import {cacheKey} from 'api'
import {User} from 'api/Response'
import {useAuthToken, useApi} from 'hooks/api'

type ProfileOptions = Omit<UseQueryOptions, 'queryFn'>

const useProfile = (props: ProfileOptions) => {
  const api = useApi()
  const {token} = useAuthToken()
  const queryClient = useQueryClient()
  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [cacheKey.profile],
    queryFn: api.getProfile,
    enabled: !!token,
    ...props,
  })

  const setProfile = React.useCallback(
    (newData: User) => queryClient.setQueryData([cacheKey.profile], newData),
    [queryClient]
  )

  return {profile, refetch, isLoading, setProfile}
}

export default useProfile
