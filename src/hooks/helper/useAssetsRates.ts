import {useQuery} from '@tanstack/react-query'

import {cacheKey} from 'api'
import {AssetRates} from 'api/Response'
import {useAuthToken} from 'hooks/api'
import useApi from 'hooks/api/useApi'

export default function useAssetRates(asset: string, target_asset: string) {
  const api = useApi()
  const {token} = useAuthToken()

  return useQuery<AssetRates[]>({
    queryKey: [cacheKey.assetRates, asset, target_asset],
    queryFn: () => api.getAssetRates({asset: asset, target_asset: target_asset}),
    enabled: !!token,
  })
}
