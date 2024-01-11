import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'
import {useTranslation} from 'react-i18next'

import StatusBadge from '@core/StatusBadge'

import {TableDataType} from './Table'

interface DataProps<T> {
  config: TableDataType[]
  data: T[]
  localKeyPrefix: string
  onPress?: (param: T) => void
}

export const Body = <T,>({data, config, localKeyPrefix, onPress}: DataProps<T>) => {
  const styles = useStyles()
  const {t} = useTranslation()

  const renderCellContent = (
    item: TableDataType,
    cIndex: number,
    field: string,
    fIndex: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any,
    localKeyPrefix: string
  ) => {
    const itemStyle = item.textStyle?.[fIndex]

    switch (item.types?.[fIndex]) {
      case 'badge': {
        const label = t(`${localKeyPrefix}.${field}.${row[field]}`)
        return <StatusBadge key={`${cIndex}-${fIndex}`} label={label} status={row[field]} />
      }
      case 'keypair':
        return (
          <Text key={`${cIndex}-${fIndex}`} style={[styles.rowText, itemStyle]}>
            {<Text style={styles.labelText}>{t(`${localKeyPrefix}.${field}`)}: </Text>}
            {row[field]}
          </Text>
        )
      default:
        return (
          <Text key={`${cIndex}-${fIndex}`} style={[styles.rowText, itemStyle]}>
            {' '}
            {row[field]}{' '}
          </Text>
        )
    }
  }

  return (
    <>
      {data.map((row: T, rowIndex: number) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={rowIndex.toString()}
          style={[
            styles.tableRow,
            rowIndex === data.length - 1 ? styles.bottomRow : styles.bodyRow,
          ]}
          onPress={() => onPress && onPress(row)}
        >
          {config.map((item: TableDataType, cIndex: number) => (
            <View key={cIndex} style={[item.cellStyle]}>
              {item.fields.map((field: string, fIndex: number) =>
                renderCellContent(item, cIndex, field, fIndex, row, localKeyPrefix)
              )}
            </View>
          ))}
        </TouchableOpacity>
      ))}
      {data.length === 0 && (
        <View style={[styles.tableRow, styles.emptyRow]}>
          <Text>{t('common.noRecordsFound')}</Text>
        </View>
      )}
    </>
  )
}

const useStyles = makeStyles(({colors}) => ({
  tableRow: {
    padding: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  emptyRow: {
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  bodyRow: {
    height: 'auto',
    borderBottomWidth: 1,
    borderColor: colors.divider,
  },
  bottomRow: {
    height: 'auto',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  rowText: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  labelText: {
    fontWeight: '700',
  },
}))
