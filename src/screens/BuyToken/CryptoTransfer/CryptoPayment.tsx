import React from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Button, Text} from '@rneui/themed'

import BottomSheet, {BottomSheetProps} from '@core/BottomSheet'

const CryptoPayment: React.FC<
  Omit<BottomSheetProps, 'children' | 'title'> & {onPress: () => void; isLoading: boolean}
> = ({isOpened, onClose, onPress, isLoading}) => {
  const {t} = useTranslation()
  return (
    <BottomSheet
      title={t('cryptoTransfer.modalTitle')}
      isOpened={isOpened}
      onClose={onClose}
      style={{
        rowGap: 2,
      }}
    >
      <View>
        <Text style={{fontSize: 16, marginBottom: 15}}>{t('cryptoTransfer.messages')}</Text>
        <Button
          title={t('cryptoTransfer.proceed')}
          containerStyle={{marginTop: 10}}
          loading={isLoading}
          onPress={onPress}
        />
        <Button
          title={t('cryptoTransfer.cancel')}
          color='error'
          containerStyle={{marginTop: 10}}
          onPress={onClose}
        />
      </View>
    </BottomSheet>
  )
}

export default CryptoPayment
