import React from 'react'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

import useChain from './useChain'

const useWallet = () => {
  const {isConnected: isChainConnected} = useChain()
  const {provider, isConnected, address, ...restOptions} = useWalletConnectModal()

  const isEnabled = React.useMemo<boolean>(
    () => Boolean(provider && isConnected && address && isChainConnected),
    [provider, isConnected, address, isChainConnected]
  )

  return {isConnected, isEnabled, address, provider, ...restOptions}
}

export default useWallet
