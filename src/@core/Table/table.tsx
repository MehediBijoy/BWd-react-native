import React from 'react'
import {View, ViewStyle, TextStyle, ActivityIndicator} from 'react-native'
import {makeStyles, useTheme} from '@rneui/themed'

import {Header} from './header'
import {Body} from './body'

export type TableDataType = {
  fields: string[]
  localKeys?: string[]
  types?: string[]
  cellStyle?: TextStyle
  textStyle?: TextStyle[]
  header: string
}

interface TableProps<T> {
  containerStyle?: ViewStyle
  config: TableDataType[]
  isLoading?: boolean
  data?: T[]
  onPress?: (param: number) => void
}

export const Table = <T,>({containerStyle, config, isLoading, data, onPress}: TableProps<T>) => {
  const styles = useStyles()
  const {theme} = useTheme()
  return (
    <View style={[styles.container, containerStyle]}>
      <Header config={config} />
      {!isLoading && data && (
        <Body data={data} config={config} onPress={param => onPress && onPress(param)} />
      )}
      {isLoading && (
        <ActivityIndicator style={{marginVertical: 20}} size='large' color={theme.colors.primary} />
      )}
    </View>
  )
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    backgroundColor: colors.background,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
}))
