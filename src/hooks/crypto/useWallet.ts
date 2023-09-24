import React from 'react'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

import {chain} from 'constants/wallet.config'

import useChainId from './useChainId'

const useWallet = () => {
  const {chainId} = useChainId()
  const {provider, isConnected, address, ...restOptions} = useWalletConnectModal()

  const isChainConnected = chain.id === chainId

  const isEnabled = React.useMemo<boolean>(
    () => Boolean(provider && isConnected && address && isChainConnected),
    [provider, isConnected, address, isChainConnected]
  )

  return {isConnected, isEnabled, address, provider, isChainConnected, ...restOptions}
}

export default useWallet
