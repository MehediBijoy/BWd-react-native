import React from 'react'
import {bscTestnet} from 'viem/chains'
import {createPublicClient, custom, PublicClient, createWalletClient, WalletClient} from 'viem'
import {useWalletConnectModal, IProvider} from '@walletconnect/modal-react-native'

const useClient = () => {
  const {isConnected, provider} = useWalletConnectModal()

  const publicClient = React.useMemo<PublicClient | undefined>(
    () =>
      isConnected && provider
        ? createPublicClient({chain: bscTestnet, transport: custom(provider as IProvider)})
        : undefined,
    [isConnected, provider]
  )

  const walletClient = React.useMemo<WalletClient | undefined>(
    () =>
      isConnected && provider
        ? createWalletClient({chain: bscTestnet, transport: custom(provider as IProvider)})
        : undefined,
    [isConnected, provider]
  )

  return {publicClient: publicClient as PublicClient, walletClient: walletClient as WalletClient}
}

export default useClient
