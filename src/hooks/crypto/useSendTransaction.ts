import React from 'react'
import {Address, parseEther} from 'viem'
import {useMutation} from '@tanstack/react-query'

import {chain, abi, getContractInfo, ContractType} from 'constants/wallet.config'

import useClient from './useClient'
import useWallet from './useWallet'

export type TransactionProps = {
  recipient: Address
  value: string
}

const useSendTransaction = (PaymentType?: ContractType) => {
  const {walletClient} = useClient()
  const {address} = useWallet()

  const transfer = async ({recipient, value}: TransactionProps) =>
    await walletClient.sendTransaction({
      account: address as Address,
      to: recipient as Address,
      value: parseEther(value),
      chain: chain,
    })

  const contractTransfer = async ({recipient, value}: TransactionProps) =>
    await walletClient.writeContract({
      abi,
      functionName: 'transfer',
      address: getContractInfo(PaymentType as ContractType).address,
      account: address as Address,
      args: [recipient, parseEther(value)],
      chain,
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mutationFn = React.useMemo(() => (PaymentType ? contractTransfer : transfer), [PaymentType])

  const {data, isLoading, mutate, mutateAsync} = useMutation({mutationFn})

  return {data, isLoading, mutate, mutateAsync}
}

export default useSendTransaction
