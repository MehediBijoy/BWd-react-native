import {useQuery, UseQueryResult} from '@tanstack/react-query'

import {cacheKey} from 'api'
import {DynamicFee} from 'api/Response'
import {useAuthToken, useApi} from 'hooks/api'

const useDynamicFees = (): UseQueryResult<DynamicFee[]> => {
  const api = useApi()
  const {token} = useAuthToken()

  return useQuery<DynamicFee[]>({
    queryKey: [cacheKey.dynamicFees],
    queryFn: () => api.getDynamicFees(),
    enabled: !!token,
  })
}

export default useDynamicFees
