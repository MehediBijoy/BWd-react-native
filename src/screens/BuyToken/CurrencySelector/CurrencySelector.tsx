import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {Divider, Text} from '@rneui/themed'

import BottomSheet, {BottomSheetProps} from '@core/BottomSheet'

import {usePlatform} from 'hooks/helper'
import {AllCurrencyType} from 'constants/currency.config'

import {getCurrencyConfig} from '../currencySelector.config'

const CurrencySelect: React.FC<
  Omit<BottomSheetProps, 'children' | 'title'> & {onPress: (id: AllCurrencyType) => void}
> = ({isOpened, onClose, onPress}) => {
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
      {currencyConfig.map((item, index, array) => (
        <View key={item.id}>
          <TouchableOpacity
            onPress={() => {
              onClose()
              onPress(item.id)
            }}
          >
            <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
              {item.icon}
              <Text style={{fontSize: 16, fontWeight: '700'}}>{item.label}</Text>
            </View>
          </TouchableOpacity>

          {index + 1 !== array.length && <Divider style={{marginTop: 10}} />}
        </View>
      ))}
    </BottomSheet>
  )
}

export default CurrencySelect
