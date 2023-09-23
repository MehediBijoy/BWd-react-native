import {useMemo} from 'react'

import useDynamicFees from './useDynamicFees'

export default function useNextTierFees(fees?: string) {
  const {data} = useDynamicFees()

  const sortedData = useMemo(
    () => data?.sort((a, b) => parseFloat(b.fee_percentage) - parseFloat(a.fee_percentage)),
    [data]
  )

  const feesObject = useMemo<any>(
    () =>
      sortedData?.reduce(
        (acc, curr, index, arr) => ({...acc, [curr?.fee_percentage]: arr[index + 1]}),
        {}
      ),
    [sortedData]
  )

  return fees && feesObject?.[fees]
}
