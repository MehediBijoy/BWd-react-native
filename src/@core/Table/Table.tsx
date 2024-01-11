import React from 'react'
import {View, ViewStyle, TextStyle, ActivityIndicator} from 'react-native'
import {makeStyles, useTheme} from '@rneui/themed'

import {Header} from './Header'
import {Body} from './Body'

export type TableDataType = {
  fields: string[]
  types?: string[]
  cellStyle?: TextStyle
  textStyle?: TextStyle[]
}

interface TableProps<T> {
  containerStyle?: ViewStyle
  config: TableDataType[]
  isLoading?: boolean
  data?: T[]
  localKeyPrefix: string
  onPress?: (param: T) => void
}

export const Table = <T,>({
  containerStyle,
  config,
  isLoading,
  data,
  localKeyPrefix,
  onPress,
}: TableProps<T>) => {
  const styles = useStyles()
  const {theme} = useTheme()
  return (
    <View style={[styles.container, containerStyle]}>
      <Header config={config} localKeyPrefix={localKeyPrefix} />
      {!isLoading && data && (
        <Body
          data={data}
          config={config}
          onPress={param => onPress && onPress(param)}
          localKeyPrefix={localKeyPrefix}
        />
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
