import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Button, Icon, Text, makeStyles} from '@rneui/themed'

import Modal, {ModalProps} from '@core/Modal'

import {alpha} from 'utils'
import {useDisconnect} from 'hooks/crypto'
import {useWalletController} from 'hooks/states'

const WalletDisconnect = ({isOpened, onClose}: Pick<ModalProps, 'isOpened' | 'onClose'>) => {
  const styles = useStyles()
  const {t} = useTranslation()
  const {setIsOpened} = useWalletController()
  const {isLoading, disconnect} = useDisconnect()

  return (
    <Modal
      title={t('walletConnect.title')}
      isOpened={isOpened}
      onClose={onClose}
      style={styles.container}
    >
      <Icon name='disconnect' type='ant-design' size={50} color={styles.error.color} />
      <Text style={styles.textMute}>{t('walletConnect.disconnectTitle')}</Text>
      <View style={styles.btnGroup}>
        <Button
          title={t('common.cancel')}
          type='outline'
          buttonStyle={{minWidth: 120}}
          onPress={() => {
            onClose()
          }}
        />
        <Button
          title={t('walletConnect.disconnect')}
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
    color: alpha(colors.error, 0.8),
  },
}))

export default WalletDisconnect
