import {useQuery} from '@tanstack/react-query'

import {cacheKey} from 'api'
import {useApi} from 'hooks/api'

import useProfile from './useProfile'

const useProfileDetails = () => {
  const api = useApi()
  const {profile} = useProfile()

  const {data, isLoading, refetch, isRefetching, fetchStatus} = useQuery({
    queryFn: () => api.getUserInfo(profile?.id as number),
    queryKey: [cacheKey.userDetails, profile?.id],
    enabled: !!profile,
  })

  return {
    data,
    isLoading: isLoading && fetchStatus !== 'idle',
    refetch,
    isRefetching,
  }
}

export default useProfileDetails
