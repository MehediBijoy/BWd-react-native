import React from 'react'
import {Button} from '@rneui/themed'
import {useMutation} from '@tanstack/react-query'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

import {useApi} from 'hooks/api'
import {shortAddress} from 'utils'
import {useProfile} from 'hooks/helper'
import {useWalletController} from 'hooks/states'

const WalletButton = () => {
  const api = useApi()
  const {profile, setProfile} = useProfile()
  const {setIsOpened} = useWalletController()
  const {open, isOpen, address, isConnected} = useWalletConnectModal()

  const connect = async () => {
    if (!isConnected) return open()
    return setIsOpened(true)
  }

  const {mutate} = useMutation({mutationFn: api.userWallet, onSuccess: setProfile})

  React.useEffect(() => {
    if (isConnected && address && !profile?.wallet_address) {
      mutate({id: profile?.id as number, wallet_address: address, wallet_type: 'walletConnect'})
    }
  }, [isConnected, address, profile])

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
