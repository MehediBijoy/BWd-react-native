import {bsc} from 'viem/chains'
import {formatEther, Address} from 'viem'
import {UseQueryOptions, useQuery} from '@tanstack/react-query'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

import {abi, getContractAddress, ContractAddress} from 'constants/wallet.config'

import useClient from './useClient'

export type Data = {
  decimals: number
  symbol: string
  value: number
}

type UseBalanceReturn = {
  balance?: Data
  isLoading: boolean
  refetch(): void
}

type UseBalanceOptions = Omit<UseQueryOptions<Data>, 'queryKey' | 'queryFn' | 'enabled'>

const useBalance = (token?: ContractAddress, options?: UseBalanceOptions): UseBalanceReturn => {
  const {client} = useClient()
  const {isConnected, address} = useWalletConnectModal()

  const getBalance = async (): Promise<Data> => {
    const balance = await client.getBalance({address: address as Address})
    return {
      value: Number(formatEther(balance as bigint)),
      ...bsc.nativeCurrency,
    }
  }

  const getContractBalance = async (tt: ContractAddress): Promise<Data> => {
    const contract = getContractAddress(tt)
    const params = {
      address: contract,
      abi,
    } as const

    const [balance, symbol, decimals] = await client.multicall({
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

  const fetchBalance = (): Promise<Data> => {
    if (!token) return getBalance()
    return getContractBalance(token)
  }

  const {data, refetch, isLoading, fetchStatus} = useQuery<Data>({
    queryKey: ['walletconnect', address, token],
    queryFn: fetchBalance,
    enabled: Boolean(isConnected && !!client),
    ...options,
  })

  return {balance: data, refetch, isLoading: isLoading && fetchStatus !== 'idle'}
}

export default useBalance
