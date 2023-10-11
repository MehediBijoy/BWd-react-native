import {useQuery, UseQueryOptions} from '@tanstack/react-query'

import {cacheKey} from 'api'
import {Asset} from 'api/Response'
import {useAuthToken, useApi} from 'hooks/api'

type UseAssetsOptions = Omit<UseQueryOptions<Asset | Asset[]>, 'queryFn' | 'queryKey'>

type UseAssetsReturns<Tdata> = {
  data: Tdata | undefined
  isLoading: boolean
  refetch(): void
}

type Symbols = 'BWG' | 'BUSD' | 'BNB'

function useAssets(): UseAssetsReturns<Asset[]>
function useAssets(symbol?: Symbols): UseAssetsReturns<Asset>
function useAssets(
  symbol?: Symbols,
  options?: UseAssetsOptions
): UseAssetsReturns<Asset | Asset[]> {
  const api = useApi()
  const {token} = useAuthToken()

  const {data, isLoading, refetch} = useQuery<Asset | Asset[]>({
    queryKey: [cacheKey.asset, symbol],
    queryFn: () => {
      if (!symbol) return api.getAssets()
      return api.getAssetBySymbol(symbol)
    },
    enabled: !!token,
    ...options,
  })

  return {data, isLoading, refetch}
}

export default useAssets
