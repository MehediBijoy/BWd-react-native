import React from 'react'
import {Button, Dialog, Text} from '@rneui/themed'
import {useTranslation} from 'react-i18next'
import {useMutation} from '@tanstack/react-query'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

import {useApi} from 'hooks/api'
import {shortAddress} from 'utils'
import {useProfile} from 'hooks/helper'
import {useWalletController} from 'hooks/states'

type AlertModalProps = {
  isVisible: boolean
  onClose: () => void
  onPress: () => void
}

const AlertModal = ({isVisible, onClose, onPress}: AlertModalProps) => {
  const {t} = useTranslation()
  return (
    <Dialog isVisible={isVisible} onBackdropPress={onClose}>
      <Text style={{fontSize: 16, lineHeight: 20}}>{t('walletConnect.alertMessage')}</Text>
      <Dialog.Actions>
        <Dialog.Button title='OK' onPress={onPress} />
      </Dialog.Actions>
    </Dialog>
  )
}

const WalletButton = () => {
  const api = useApi()
  const {t} = useTranslation()
  const [visible, setVisible] = React.useState(false)
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
  }, [isConnected, address, profile, mutate])

  return (
    <>
      <Button
        loading={isOpen}
        // onPress={() => connect()}
        onPress={() => (!isConnected ? setVisible(true) : connect())}
        titleStyle={{fontSize: 14}}
        title={isConnected && address ? shortAddress(address) : t('walletConnect.connectWallet')}
        containerStyle={{minWidth: 120, borderRadius: 8}}
      />
      <AlertModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onPress={() => {
          setVisible(false)
          connect()
        }}
      />
    </>
  )
}

export default WalletButton
