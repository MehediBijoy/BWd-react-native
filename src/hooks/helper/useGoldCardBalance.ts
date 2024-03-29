import {useQuery} from '@tanstack/react-query'

import {cacheKey} from 'api'
import {GoldCardAccount} from 'api/Response'
import {useApi} from 'hooks/api'

const useGoldCardBalance = () => {
  const api = useApi()

  const {data, isLoading, refetch} = useQuery<GoldCardAccount>({
    queryKey: [cacheKey.goldCardAccount],
    queryFn: () => api.getGoldCardAccount(),
  })

  return {
    refetch,
    balance: data
      ? {
          value: Number(data.current_balance),
          symbol: 'goldcard',
          decimals: 0,
        }
      : undefined,
    isLoading: isLoading,
  }
}

export default useGoldCardBalance
