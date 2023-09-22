import {bsc} from 'viem/chains'
import {formatEther, Address} from 'viem'
import {UseQueryOptions, useQuery} from '@tanstack/react-query'

import {abi, getContractInfo, ContractInfo} from 'constants/wallet.config'

import useClient from './useClient'
import useWallet from './useWallet'
import useInvalidateOnBlock from './useInvalidateOnBlock'

export type DataProps = {
  decimals: number
  symbol: string
  value: number
}

type UseBalanceReturn = {
  balance?: DataProps
  isLoading: boolean
  refetch(): void
}

type UseBalanceOptions = Omit<UseQueryOptions<DataProps>, 'queryKey' | 'queryFn' | 'enabled'> & {
  token?: ContractInfo
  watch?: boolean
}

const useBalance = ({
  token,
  watch = false,
  ...options
}: UseBalanceOptions = {}): UseBalanceReturn => {
  const {publicClient} = useClient()
  const {address, isEnabled} = useWallet()

  const queryKey = ['cryptoBalance', address, token]

  const getBalance = async (): Promise<DataProps> => {
    const balance = await publicClient.getBalance({address: address as Address})
    return {
      value: Number(formatEther(balance as bigint)),
      ...bsc.nativeCurrency,
    }
  }

  const getContractBalance = async (tt: ContractInfo): Promise<DataProps> => {
    const {address: contract} = getContractInfo(tt)
    const params = {
      address: contract,
      abi,
    } as const

    const [balance, symbol, decimals] = await publicClient.multicall({
      allowFailure: false,
      contracts: [
        {
          ...params,
          functionName: 'balanceOf',
          args: [address as Address],
        },
        {...params, functionName: 'symbol'},
        {...params, functionName: 'decimals'},
      ],
    })

    return {
      value: Number(formatEther(balance as bigint)),
      symbol: symbol,
      decimals: decimals,
    }
  }

  const queryFn = (): Promise<DataProps> => {
    if (!token) return getBalance()
    return getContractBalance(token)
  }

  const {data, refetch, isLoading, fetchStatus} = useQuery<DataProps>({
    queryKey,
    queryFn,
    enabled: Boolean(!!publicClient && isEnabled),
    ...options,
  })

  useInvalidateOnBlock({
    queryKey,
    enabled: Boolean(!!publicClient && isEnabled && watch),
  })

  return {
    refetch,
    balance: isEnabled ? data : undefined,
    isLoading: isLoading && fetchStatus !== 'idle',
  }
}

export default useBalance
