import React from 'react'
import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'
import {useTranslation} from 'react-i18next'

import {TableDataType} from './table'

interface HeaderProps {
  config: TableDataType[]
}

export const Header: React.FC<HeaderProps> = ({config}) => {
  const styles = useStyles()
  const {t} = useTranslation()

  return (
    <View style={[styles.header]}>
      {config.map((item: TableDataType, index: number) => (
        <View key={index.toString()} style={[item.cellStyle]}>
          <Text>{t(item.header)} </Text>
        </View>
      ))}
    </View>
  )
}

const useStyles = makeStyles(({colors}) => ({
  header: {
    padding: 10,
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.divider,
    backgroundColor: colors.grey4,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
}))
