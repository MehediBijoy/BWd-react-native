import React from 'react'
import ModalBase from 'react-native-modal'
import {Icon, Text, makeStyles} from '@rneui/themed'
import {View, ViewStyle, TouchableOpacity} from 'react-native'

import {alpha} from 'utils'

export type ModalProps = {
  title: string | JSX.Element
  isOpened: boolean
  onClose: () => void
  children: React.ReactNode
  style?: ViewStyle
}

const Modal = ({isOpened, onClose, title, children, style}: ModalProps) => {
  const styles = useStyles()

  return (
    <ModalBase
      isVisible={isOpened}
      backdropTransitionOutTiming={0}
      animationIn='fadeIn'
      animationOut='fadeOut'
      useNativeDriver
      statusBarTranslucent
      backdropColor='transparent'
      style={styles.modal}
    >
      <View style={[styles.container]}>
        <View style={[styles.titleContainer]}>
          {React.isValidElement(title) ? title : <Text style={styles.title}>{title}</Text>}
          <TouchableOpacity onPress={onClose} activeOpacity={0.8}>
            <Icon
              type='ionicon'
              name='close'
              size={25}
              style={styles.icon}
              color={styles.icon.color}
            />
          </TouchableOpacity>
        </View>
        <View style={style}>{children}</View>
      </View>
    </ModalBase>
  )
}

const useStyles = makeStyles(({colors}) => ({
  modal: {
    margin: 0,
    padding: 15,
    backgroundColor: alpha(colors.black, 0.7),
  },
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
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.error,
    backgroundColor: alpha(colors.error, 0.2),
  },
}))

export default Modal
