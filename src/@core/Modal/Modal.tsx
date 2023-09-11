import React from 'react'
import {View} from 'react-native'
import ModalBase from 'react-native-modal'
import {Icon, Text, makeStyles} from '@rneui/themed'

type ModalProps = {
  title: string | JSX.Element
  isOpened: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({isOpened, onClose, title, children}: ModalProps) => {
  const styles = useStyles()

  return (
    <ModalBase
      isVisible={isOpened}
      backdropTransitionOutTiming={0}
      animationIn='fadeIn'
      animationOut='fadeOut'
    >
      <View style={[styles.container]}>
        <View style={[styles.titleContainer]}>
          {React.isValidElement(title) ? title : <Text style={styles.title}>{title}</Text>}
          <Icon type='ionicon' name='close' onPress={onClose} style={styles.icon} />
        </View>
        <View>{children}</View>
      </View>
    </ModalBase>
  )
}

const useStyles = makeStyles(({colors}) => ({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  container: {
    padding: 15,
    minHeight: 150,
    width: '100%',
    borderRadius: 5,
    backgroundColor: colors.background,
  },
  icon: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export default Modal
