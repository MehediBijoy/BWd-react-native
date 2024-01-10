import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'
import {useTranslation} from 'react-i18next'

import StatusBadge from '@core/StatusBadge'

import {TableDataType} from './table'

interface DataProps<T> {
  config: TableDataType[]
  data: T[]
  onPress?: (param: number) => void
}

export const Body = <T,>({data, config, onPress}: DataProps<T>) => {
  const styles = useStyles()
  const {t} = useTranslation()

  const renderCellContent = (
    item: TableDataType,
    cIndex: number,
    field: string,
    fIndex: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any
  ) => {
    const itemStyle = item.textStyle?.[fIndex]

    switch (item.types?.[fIndex]) {
      case 'text':
        return (
          <Text key={`${cIndex}-${fIndex}`} style={[styles.rowText, itemStyle]}>
            {' '}
            {row[field]}{' '}
          </Text>
        )
      case 'badge': {
        const localKey = item.localKeys?.[fIndex]?.replace(`##${field}##`, row[field]) ?? ''
        return <StatusBadge key={`${cIndex}-${fIndex}`} label={t(localKey)} status={row[field]} />
      }
      case 'keypair':
        return (
          <Text key={`${cIndex}-${fIndex}`} style={[styles.rowText, itemStyle]}>
            {item.localKeys?.[fIndex] && (
              <Text style={styles.labelText}>{t(item.localKeys[fIndex])}: </Text>
            )}
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
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.map((row: any, rowIndex: number) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={rowIndex.toString()}
            style={[
              styles.tableRow,
              rowIndex === data.length - 1 ? styles.bottomRow : styles.bodyRow,
            ]}
            onPress={() => onPress && onPress(row['id'])}
          >
            {config.map((item: TableDataType, cIndex: number) => (
              <View key={cIndex} style={[item.cellStyle]}>
                {item.fields.map((field: string, fIndex: number) =>
                  renderCellContent(item, cIndex, field, fIndex, row)
                )}
              </View>
            ))}
          </TouchableOpacity>
        ))
      }
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
    color: colors.textPrimary,
  },
  labelText: {
    fontWeight: '700',
  },
}))
