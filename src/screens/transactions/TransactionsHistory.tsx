import React from 'react'
import {useTranslation} from 'react-i18next'
import {Text, makeStyles, useTheme} from '@rneui/themed'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {ActivityIndicator, TouchableOpacity, View} from 'react-native'

import StatusBadge from '@core/StatusBadge'

import {useApi} from 'hooks/api'
import {OrderHistory} from 'api/Response'
import {cacheKey} from 'api/CacheKey'
import {useSocket} from 'hooks/helper'
import {useLocales} from 'hooks/states'
import {formatDate, formatNumber} from 'utils'

import OrderDetailsModal from './OrderDetailsModal'

const TransactionsHistory = () => {
  const api = useApi()
  const {t} = useTranslation()
  const {theme} = useTheme()
  const styles = useStyles()
  const {subscribe} = useSocket()
  const {currentLang} = useLocales()
  const queryClient = useQueryClient()
  const [selectedId, setSelectedId] = React.useState<number>()

  const {data: orderHistory, isLoading} = useQuery<OrderHistory>({
    queryKey: [cacheKey.orderHistory],
    queryFn: api.getOrders,
  })

  const selectedRow = React.useMemo(
    () => orderHistory?.payments?.find(item => item.id === selectedId),
    [selectedId, orderHistory]
  )

  React.useEffect(() => {
    subscribe('PaymentsChannel', {
      received({data: socketData}) {
        queryClient.setQueryData<Partial<OrderHistory>>([cacheKey.orderHistory], orders => {
          const hasOrder = orders?.payments?.find(item => item.id === socketData.id)
          if (!hasOrder) {
            orders?.payments?.unshift(socketData)
          } else {
            Object.assign(hasOrder, socketData)
          }
          const data = orders?.payments?.map(item =>
            item.id === socketData.id ? socketData : item
          )
          return {payments: data, meta: orders?.meta}
        })
      },
    })

    subscribe('TransfersChannel', {
      received({data: socketData}) {
        queryClient.setQueryData<Partial<OrderHistory>>([cacheKey.orderHistory], orders => {
          const data = orders?.payments?.map(item =>
            item.id === socketData?.payment_id ? {...item, transfer: socketData} : item
          )
          return {payments: data, meta: orders?.meta}
        })
      },
    })
  }, [queryClient, subscribe])

  return (
    <>
      <View style={[styles.container]}>
        <View style={[styles.tableRow, styles.headerRow]}>
          <Text style={styles.cellDetails}>{t('common.table-header-description')}</Text>
          <Text style={styles.cellStatus}>{t('trade.table.status')}</Text>
          <Text style={[styles.cellDate, styles.rowText]}>{t('trade.table.headers.date')}</Text>
        </View>

        {isLoading && (
          <ActivityIndicator
            style={{marginVertical: 20}}
            size='large'
            color={theme.colors.primary}
          />
        )}
        {!isLoading &&
          orderHistory &&
          orderHistory.payments &&
          orderHistory.payments.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              style={[
                styles.tableRow,
                index === orderHistory.payments.length - 1 ? styles.bottomRow : styles.bodyRow,
              ]}
              onPress={() => setSelectedId(item.id)}
            >
              <View style={styles.cellDetails}>
                <Text style={[styles.rowText, styles.titleText]}>
                  {t('trade.table.headers.order')}: #{item.id}
                </Text>
                <Text style={styles.rowText}>
                  <Text style={styles.labelText}>{t('trade.table.headers.paidAmount')}: </Text>
                  {formatNumber(item.paid_amount_number, {locales: currentLang})}{' '}
                  {item.paid_amount_currency}
                </Text>
                <Text style={styles.rowText}>
                  <Text style={styles.labelText}>{t('trade.table.headers.receivedAmount')}: </Text>
                  {formatNumber(item.received_amount_number, {locales: currentLang})}{' '}
                  {item.received_amount_currency}
                </Text>
                <Text style={styles.rowText}>
                  <Text style={styles.labelText}>{t('dashboard.buy.confirm.method')}: </Text>
                  {item.payment_type}
                </Text>
                <Text style={styles.rowText}>
                  <Text style={styles.labelText}>{t('trade.table.headers.paymentFor')}: </Text>
                  {item.payment_for}
                </Text>
              </View>
              <View style={styles.cellStatus}>
                <Text style={[styles.rowText, {marginBottom: 5}]}>
                  {item.transfer?.status
                    ? t('trade.table.headers.transfer')
                    : t('trade.table.headers.payment')}
                </Text>
                <StatusBadge
                  status={item.transfer?.status ?? item.status}
                  label={t(`trade.orderStatuses.${item.transfer?.status ?? item.status}`)}
                />
              </View>
              <View style={styles.cellDate}>
                <Text style={styles.rowText}>{formatDate(item.created_at, 'hh:mm A')}</Text>
                <Text style={styles.rowText}>{formatDate(item.created_at, 'MMM DD,YYYY')}</Text>
              </View>
            </TouchableOpacity>
          ))}
        {orderHistory && orderHistory.payments && orderHistory.payments.length === 0 && (
          <View style={[styles.tableRow, styles.emptyRow]}>
            <Text>{t('common.noRecordsFound')}</Text>
          </View>
        )}
      </View>

      {selectedRow && (
        <OrderDetailsModal isOpened data={selectedRow} onClose={() => setSelectedId(undefined)} />
      )}
    </>
  )
}

export default TransactionsHistory

const useStyles = makeStyles(({colors}) => ({
  container: {
    backgroundColor: colors.background,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tableRow: {
    padding: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  headerRow: {
    backgroundColor: colors.grey4,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
    fontSize: 11,
    color: colors.textPrimary,
  },
  cellDate: {
    alignItems: 'flex-end',
    textAlign: 'right',
    width: '22%',
  },
  cellDetails: {
    textAlign: 'left',
    width: '53%',
  },
  cellStatus: {
    textAlign: 'center',
    alignItems: 'center',
    width: '25%',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
  },
  labelText: {
    fontSize: 11,
    fontWeight: '700',
  },
}))
