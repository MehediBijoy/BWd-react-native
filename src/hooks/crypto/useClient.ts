import React from 'react'
import {bscTestnet} from 'viem/chains'
import {createPublicClient, custom, PublicClient} from 'viem'
import {useWalletConnectModal, IProvider} from '@walletconnect/modal-react-native'

const useClient = () => {
  const {isConnected, provider} = useWalletConnectModal()

  const client = React.useMemo<PublicClient | undefined>(
    () =>
      isConnected && provider
        ? createPublicClient({chain: bscTestnet, transport: custom(provider as IProvider)})
        : undefined,
    [isConnected, provider]
  )

  return {client: client as PublicClient}
}

export default useClient
