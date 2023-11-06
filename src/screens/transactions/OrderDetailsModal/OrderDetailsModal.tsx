import React from 'react'
import {useTranslation} from 'react-i18next'
import {Text, makeStyles} from '@rneui/themed'
import {View, Linking, TouchableOpacity, ScrollView} from 'react-native'

import Modal from '@core/Modal'
import CopyButton from '@core/CopyButton'
import StatusBadge from '@core/StatusBadge'

import {chain} from 'constants/wallet.config'
import {Payment, Transfer} from 'api/Response'
import {formatDate, shortAddress} from 'utils'

export type OrderDetailsModalProps = {
  isOpened: boolean
  data: Payment<Transfer>
  onClose: () => void
}

const OrderDetailsModal = ({data, isOpened, onClose}: OrderDetailsModalProps) => {
  const {t} = useTranslation()
  const styles = useStyles()

  const onExplorerClicked = (txHash: string) => {
    Linking.openURL(chain.blockExplorers?.default.url + '/tx/' + txHash)
  }

  return (
    <Modal title={t('trade.modal.title.orders')} isOpened={isOpened} onClose={onClose}>
      <ScrollView>
        <View style={{marginBottom: 30}}>
          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.date')}</Text>
            <Text>{formatDate(data.created_at)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              {t('trade.table.headers.order') + ' ' + t('trade.table.headers.id')}
            </Text>
            <Text>{data?.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.tradePair')}</Text>
            <Text style={[styles.labelRight]}>{data.trade_pair}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.paid')}</Text>
            <Text style={styles.labelRight}>{data.paid_amount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.received')} </Text>
            <Text style={styles.labelRight}>{data.received_amount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.paymentType')} </Text>
            <Text style={[styles.labelRight]}>{data.payment_type}</Text>
          </View>

          {data.transfer && data.transfer.tx_hash && (
            <View style={styles.row}>
              <Text style={styles.label}>{t('trade.table.headers.blockExplorer')} </Text>
              <TouchableOpacity activeOpacity={0.8}>
                <Text
                  style={styles.explorer}
                  onPress={() => onExplorerClicked(data.transfer.tx_hash)}
                >
                  {t('trade.table.headers.viewInExplorer')}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {data.transfer && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>{t('trade.table.headers.sender')}</Text>
                <Text style={[styles.labelRight]}>
                  {data.transfer.sender ? shortAddress(data.transfer.sender, 7) : '-'}
                </Text>
                {data.transfer.sender && (
                  <View style={{alignItems: 'flex-end'}}>
                    <CopyButton toCopy={data.transfer.sender} />
                  </View>
                )}
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>{t('trade.table.headers.recipient')}</Text>

                <Text style={[styles.labelRight]}>
                  {data.transfer.recipient ? shortAddress(data.transfer.recipient, 7) : '-'}
                </Text>
                {data.transfer.recipient && (
                  <View style={{alignItems: 'flex-end'}}>
                    <CopyButton toCopy={data.transfer.recipient} />
                  </View>
                )}
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>{t('trade.table.headers.txHash')}</Text>
                <Text style={[styles.labelRight]}>
                  {data.transfer.tx_hash ? shortAddress(data.transfer.tx_hash, 7) : '-'}
                </Text>
                {data.transfer.tx_hash && (
                  <View style={{alignItems: 'flex-end'}}>
                    <CopyButton toCopy={data.transfer.tx_hash} />
                  </View>
                )}
              </View>
            </>
          )}

          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.paymentStatus')}</Text>
            <Text style={[styles.labelRight]}>
              <StatusBadge status={data.status ?? 'accepted'} label={data.status} />
            </Text>
          </View>

          {data.status && data.status_reason && (
            <View style={styles.row}>
              <Text style={styles.label}>{t('trade.table.headers.paymentStatusReason')}</Text>
              <Text style={[styles.labelRight]}>{data.status_reason}</Text>
            </View>
          )}

          {data.transfer && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>{t('trade.table.headers.transferStatus')}</Text>
                <Text style={[styles.labelRight]}>
                  <StatusBadge
                    status={data.transfer.status ? data.transfer.status : 'accepted'}
                    label={data.transfer.status ?? '-'}
                  />
                </Text>
              </View>

              {data.transfer.status && data.transfer.status_reason && (
                <View style={styles.row}>
                  <Text style={styles.label}>{t('trade.table.headers.paymentStatusReason')}</Text>
                  <Text style={[styles.labelRight]}>{data.transfer.status_reason}</Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </Modal>
  )
}

export default OrderDetailsModal

const useStyles = makeStyles(({colors}) => ({
  row: {
    gap: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: '35%',
    textAlign: 'left',
    fontWeight: '700',
    color: colors.textPrimary,
  },
  labelRight: {
    width: '50%',
    textAlign: 'left',
    color: colors.textPrimary,
  },
  explorer: {
    color: colors.tertiary,
  },
}))
