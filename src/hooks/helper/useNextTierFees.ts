import {useMemo} from 'react'

import useDynamicFees from './useDynamicFees'

export default function useNextTierFees(fees?: string) {
  const {data} = useDynamicFees()

  const sortedData = useMemo(() => {
    return data?.sort((a, b) => parseFloat(b.fee_percentage) - parseFloat(a.fee_percentage))
  }, [data])

  const feesObject = useMemo<any>(() => {
    return sortedData?.reduce((acc, curr, index, arr) => {
      return {...acc, [curr?.fee_percentage]: arr[index + 1]}
    }, {})
  }, [sortedData])

  return fees && feesObject?.[fees]
}
