import React from 'react'
import {Button} from '@rneui/themed'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

import {shortAddress} from 'utils'

const WalletButton = () => {
  const {open, isOpen, address, isConnected, provider} = useWalletConnectModal()

  const connect = async () => {
    if (isConnected) return await provider?.disconnect()
    return await open()
  }

  return (
    <Button
      loading={isOpen}
      onPress={connect}
      titleStyle={{fontSize: 14}}
      title={isConnected ? shortAddress(address as string) : 'Connect Wallet'}
      containerStyle={{minWidth: 120, borderRadius: 8}}
    />
  )
}

export default WalletButton
