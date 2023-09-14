import React from 'react'
import Modal from 'react-native-modal'
import {View, TouchableOpacity} from 'react-native'
import {Icon, Text, makeStyles, Divider} from '@rneui/themed'

import type {ModalProps} from '@core/Modal'

const BottomSheet = ({title, children, isOpened, onClose, style}: ModalProps) => {
  const styles = useStyles()

  return (
    <Modal
      style={styles.modal}
      isVisible={isOpened}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriver
      statusBarTranslucent
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          {React.isValidElement(title) ? title : <Text style={styles.title}>{title}</Text>}
          <TouchableOpacity onPress={onClose} activeOpacity={0.8}>
            <Icon name='close' size={20} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={[styles.children, style]}>{children}</View>
      </View>
    </Modal>
  )
}

const useStyles = makeStyles(({colors}) => ({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    minHeight: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.background,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  icon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgPaper,
  },
  children: {
    padding: 15,
    width: 'auto',
  },
}))

export default BottomSheet
