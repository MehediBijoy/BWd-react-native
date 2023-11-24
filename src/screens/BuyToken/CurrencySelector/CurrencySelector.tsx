import React from 'react'
import {View} from 'react-native'
import {Button, Text} from '@rneui/themed'

import BottomSheet, {BottomSheetProps} from '@core/BottomSheet'

import {usePlatform} from 'hooks/helper'
import {getCurrencyConfig} from 'constants/currency.config'

// I'm still working on currency selector

const CurrencySelect: React.FC<Omit<BottomSheetProps, 'children' | 'title'>> = ({
  isOpened,
  onClose,
}) => {
  const {platform} = usePlatform()
  const currencyConfig = getCurrencyConfig(platform)

  return (
    <BottomSheet
      title='Select Currency'
      isOpened={isOpened}
      onClose={onClose}
      style={{
        rowGap: 15,
      }}
    >
      {currencyConfig.map(({id, label, icon: Icon}) => (
        <View key={id}>
          <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
            {Icon}
            <Text style={{fontSize: 16, fontWeight: '600'}}>{label}</Text>
          </View>
        </View>
      ))}
      <Button title='change currency' />
    </BottomSheet>
  )
}

export default CurrencySelect
