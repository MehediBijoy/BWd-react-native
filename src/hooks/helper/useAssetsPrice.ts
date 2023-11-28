import {useQuery, UseQueryOptions} from '@tanstack/react-query'

import {cacheKey} from 'api'
import {useApi} from 'hooks/api'
import {useCurrency} from 'hooks/states'
import {AssetLatestPrices} from 'api/Response'

type UseAssetsOptions = Omit<UseQueryOptions<AssetLatestPrices>, 'queryFn' | 'queryKey'>

type UseAssetsReturns<Tdata> = {
  data: Tdata | undefined
  isLoading: boolean
  refetch(): void
}

function useAssetsPrice(): UseAssetsReturns<AssetLatestPrices>
function useAssetsPrice(symbol?: keyof AssetLatestPrices): UseAssetsReturns<string>
function useAssetsPrice(
  symbol?: keyof AssetLatestPrices,
  options?: UseAssetsOptions
): UseAssetsReturns<AssetLatestPrices | string> {
  const api = useApi()
  const {currency} = useCurrency()

  const {data, isLoading, refetch} = useQuery<AssetLatestPrices>({
    queryKey: [cacheKey.assetPrice, currency],
    queryFn: () => api.getAssetLatestPrices(currency),
    ...options,
  })

  return {data: data && symbol ? data[symbol] : data, isLoading, refetch}
}

export default useAssetsPrice
