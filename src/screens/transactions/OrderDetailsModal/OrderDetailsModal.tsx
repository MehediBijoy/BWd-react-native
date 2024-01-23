import React from 'react'
import RNPrint from 'react-native-print'
import {useQuery} from '@tanstack/react-query'
import {useTranslation} from 'react-i18next'
import {Text, makeStyles, Button} from '@rneui/themed'
import {View, Linking, TouchableOpacity, ScrollView} from 'react-native'

import Modal from '@core/Modal'
import CopyButton from '@core/CopyButton'
import StatusBadge from '@core/StatusBadge'

import {cacheKey} from 'api'
import {useApi} from 'hooks/api'
import {useLocales} from 'hooks/states'
import {usePlatform} from 'hooks/helper'
import {AllCurrencyType} from 'constants/currency.config'
import {chain} from 'constants/wallet.config'
import {Payment, Transfer} from 'api/Response'
import DownloadIcon from 'images/icons/PDF.svg'
import {formatDate, formatNumber, shortAddress} from 'utils'

import {html} from '../../BuyToken/BankTransfer/PaymentInformation/PdfTemplate'

export type OrderDetailsModalProps = {
  isOpened: boolean
  data: Payment<Transfer>
  onClose: () => void
}

const OrderDetailsModal = ({data, isOpened, onClose}: OrderDetailsModalProps) => {
  const api = useApi()
  const styles = useStyles()
  const {platform} = usePlatform()
  const {t} = useTranslation()
  const {currentLang} = useLocales()

  const onExplorerClicked = (txHash: string) => {
    Linking.openURL(chain.blockExplorers?.default.url + '/tx/' + txHash)
  }

  const {data: bankDetails, isLoading} = useQuery({
    queryKey: [cacheKey.bankDetails, data.id],
    queryFn: () => api.getBankDetails(data.id, platform.toLocaleLowerCase()),
    enabled: !!data,
  })

  const printHTML = async () => {
    bankDetails &&
      (await RNPrint.print({
        html: html({
          paymentData: data,
          bankDetails: bankDetails,
          currency: data.paid_amount_currency as AllCurrencyType,
          t,
        }),
        jobName: `${formatDate(data.created_at, 'YYYY_MM_DD')}_brettonwoods_digital_${data.id}`,
      }))
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
            <Text>#{data?.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.tradePair')}</Text>
            <Text style={[styles.labelRight]}>{data.trade_pair}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.paid')}</Text>
            <Text style={styles.labelRight}>
              {formatNumber(data.paid_amount_number, {locales: currentLang})}{' '}
              {data.paid_amount_currency}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('trade.table.headers.received')} </Text>
            <Text style={styles.labelRight}>
              {formatNumber(data.received_amount_number, {locales: currentLang})}{' '}
              {data.received_amount_currency}
            </Text>
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
              <StatusBadge
                status={data.status ?? 'accepted'}
                label={t(`trade.orderStatuses.${data.status}`)}
              />
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
                    label={
                      data.transfer.status ? t(`trade.orderStatuses.${data.transfer.status}`) : '-'
                    }
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

          {data.payment_type === 'bank_transfer' && (
            <Button
              icon={<DownloadIcon height={20} width={20} />}
              title={t('bankTransfer.paymentInfo.btn')}
              titleStyle={{marginLeft: 10}}
              color='#7C7C7B'
              containerStyle={{marginTop: 25}}
              loading={isLoading}
              onPress={printHTML}
            />
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
