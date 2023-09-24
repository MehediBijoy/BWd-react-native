import Color from 'color'
import {View} from 'react-native'
import {Button, Icon, Text, makeStyles} from '@rneui/themed'

import Modal, {ModalProps} from '@core/Modal'

import {useDisconnect} from 'hooks/crypto'
import {useWalletController} from 'hooks/states'

const WalletDisconnect = ({isOpened, onClose}: Pick<ModalProps, 'isOpened' | 'onClose'>) => {
  const styles = useStyles()
  const {setIsOpened} = useWalletController()
  const {isLoading, disconnect} = useDisconnect()

  return (
    <Modal title='Wallet Disconnect' isOpened={isOpened} onClose={onClose} style={styles.container}>
      <Icon name='disconnect' type='ant-design' size={50} color={styles.error.color} />
      <Text style={styles.textMute}>
        Are you sure you want to disconnect your wallet? You will need to connect again to use this
        app
      </Text>
      <View style={styles.btnGroup}>
        <Button
          title='Cancel'
          type='outline'
          buttonStyle={{minWidth: 120}}
          onPress={() => {
            onClose()
          }}
        />
        <Button
          title='Disconnect'
          color='error'
          buttonStyle={{minWidth: 120}}
          loading={isLoading}
          onPress={() => disconnect().then(() => setIsOpened(false))}
        />
      </View>
    </Modal>
  )
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    rowGap: 15,
  },
  textMute: {
    color: colors.grey3,
    fontSize: 15,
    textAlign: 'center',
  },
  btnGroup: {
    flexDirection: 'row',
    columnGap: 20,
    justifyContent: 'center',
  },
  error: {
    color: Color(colors.error).alpha(0.8).toString(),
  },
}))

export default WalletDisconnect
