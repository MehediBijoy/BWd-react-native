import React from 'react'
import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'
import {useTranslation} from 'react-i18next'

import {TableDataType} from './Table'

interface HeaderProps {
  config: TableDataType[]
  localKeyPrefix: string
}

export const Header: React.FC<HeaderProps> = ({config, localKeyPrefix}) => {
  const styles = useStyles()
  const {t} = useTranslation()

  return (
    <View style={[styles.header]}>
      {config.map((item: TableDataType, index: number) => (
        <View key={index.toString()} style={[item.cellStyle]}>
          <Text>{t(`${localKeyPrefix}.headers.header${index + 1}`)} </Text>
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
