import React from 'react'
import {createPublicClient, custom, PublicClient, createWalletClient, WalletClient} from 'viem'
import {useWalletConnectModal, IProvider} from '@walletconnect/modal-react-native'

import {chain} from 'constants/wallet.config'

const useClient = () => {
  const {isConnected, provider} = useWalletConnectModal()

  const publicClient = React.useMemo<PublicClient | undefined>(
    () =>
      isConnected && provider
        ? createPublicClient({chain: chain, transport: custom(provider as IProvider)})
        : undefined,
    [isConnected, provider]
  )

  const walletClient = React.useMemo<WalletClient | undefined>(
    () =>
      isConnected && provider
        ? createWalletClient({chain: chain, transport: custom(provider as IProvider)})
        : undefined,
    [isConnected, provider]
  )

  return {publicClient: publicClient as PublicClient, walletClient: walletClient as WalletClient}
}

export default useClient
