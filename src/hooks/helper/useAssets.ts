import {useQuery, UseQueryOptions, UseQueryResult} from '@tanstack/react-query'

import {cacheKey} from 'api'
import {Asset} from 'api/Response'
import {useAuthToken, useApi} from 'hooks/api'

type UseAssetsOptions = Omit<UseQueryOptions<Asset>, 'queryFn' | 'queryKey'>

const useAssets = (symbol: string, options?: UseAssetsOptions): UseQueryResult<Asset> => {
  const api = useApi()
  const {token} = useAuthToken()

  return useQuery<Asset>({
    queryKey: [cacheKey.asset, symbol],
    queryFn: () => api.getAssetBySymbol({symbol}),
    enabled: !!token,
    ...options,
  })
}

export default useAssets
