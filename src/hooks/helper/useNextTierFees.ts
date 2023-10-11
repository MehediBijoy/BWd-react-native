import {useMemo} from 'react'

import {DynamicFee} from 'api/Response'

import useDynamicFees from './useDynamicFees'

export default function useNextTierFees(fees?: string) {
  const {data} = useDynamicFees()

  const sortedData = useMemo(
    () => data && data.sort((a, b) => parseFloat(b.fee_percentage) - parseFloat(a.fee_percentage)),
    [data]
  )

  const feesObject = useMemo<undefined | {[key: string]: DynamicFee[]}>(
    () =>
      sortedData &&
      sortedData.reduce(
        (acc, curr, index, arr) => ({...acc, [curr.fee_percentage]: arr[index + 1]}),
        {}
      ),
    [sortedData]
  )

  return fees && feesObject && feesObject[fees]
}
