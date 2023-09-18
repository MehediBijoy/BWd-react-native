import {bsc} from 'viem/chains'
import {formatEther, Address} from 'viem'
import {UseQueryOptions, useQuery} from '@tanstack/react-query'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

import {abi, getContractInfo, ContractInfo} from 'constants/wallet.config'

import useClient from './useClient'

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

type UseBalanceOptions = Omit<UseQueryOptions<DataProps>, 'queryKey' | 'queryFn' | 'enabled'>

const useBalance = (token?: ContractInfo, options?: UseBalanceOptions): UseBalanceReturn => {
  const {publicClient} = useClient()
  const {isConnected, address} = useWalletConnectModal()

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

  const fetchBalance = (): Promise<DataProps> => {
    if (!token) return getBalance()
    return getContractBalance(token)
  }

  const {data, refetch, isLoading, fetchStatus} = useQuery<DataProps>({
    queryKey: ['walletconnect', address, token],
    queryFn: fetchBalance,
    enabled: Boolean(isConnected && !!publicClient),
    ...options,
  })

  return {balance: data, refetch, isLoading: isLoading && fetchStatus !== 'idle'}
}

export default useBalance
