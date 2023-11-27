import React from 'react'
import {useMutation} from '@tanstack/react-query'
import {useTranslation} from 'react-i18next'
import {View, Modal as NativeModal} from 'react-native'
import {Button, Icon, makeStyles, Text} from '@rneui/themed'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'
import {useNavigation, NavigationProp} from '@react-navigation/native'

import Modal from '@core/Modal'
import SafeAreaView from '@core/SafeAreaView'

import {useApi} from 'hooks/api'
import {useDebounce} from 'hooks/helper'
import {PaymentProps} from 'api/Request'
import {EstimateFee, Payment} from 'api/Response'

import PaypalView from '../PaypalView'
import {RouteStack} from 'navigators/routes'

type FiatPaymentModalProps = {
  estimateFees: EstimateFee
  isOpened: boolean
  onClose: () => void
  in_base: boolean
}

const FiatPaymentModal = ({estimateFees, isOpened, onClose, in_base}: FiatPaymentModalProps) => {
  const api = useApi()
  const {t} = useTranslation()
  const styles = useStyles()
  const navigation = useNavigation<NavigationProp<RouteStack>>()

  const {isConnected} = useWalletConnectModal()

  const createOrder = useMutation<Payment, unknown, Pick<PaymentProps, 'payment_type'>>({
    mutationFn: ({payment_type}) =>
      api.createPayment({
        asset: 'USD',
        target_asset: 'BWG',
        amount: in_base ? estimateFees.total_amount : estimateFees.received_amount,
        in_base,
        payment_type,
        success_url: 'https://www.brettonwoods.gold/',
        error_url: 'https://example.com',
      }),
  })
  const debounce = useDebounce(createOrder.reset)

  const onModalClose = () => {
    onClose()
    if (createOrder.data) {
      // Todo fixed debounce type error when D properties
      // is unknown, blow debounce should be called without
      // pass empty string
      debounce('')
    }
  }

  return (
    <Modal title={t('trade.modal.title.orders')} isOpened={isOpened} onClose={onClose}>
      {!isConnected && (
        <View style={styles.alertContainer}>
          <Icon name='warning' color={styles.icon.color} />
          <Text style={styles.alertText}>{t('dashboard.buy.wallet-connect')}</Text>
        </View>
      )}

      <View style={styles.grid}>
        <Text style={styles.gridLeftItem}>{t('dashboard.buy.amountLabel')}</Text>
        <Text style={styles.gridRightItem}>${estimateFees?.total_amount}</Text>
      </View>

      <Text style={styles.grid}>
        {t('dashboard.buy.confirm.message-1', {
          duration: estimateFees?.storage_fee_remaining_days,
          token: parseFloat(estimateFees?.storage_fee_amount).toFixed(4),
          symbol: 'BWG',
        })}
      </Text>

      <Text style={styles.grid}>
        {t('dashboard.buy.confirm.message-2', {
          token: parseFloat(estimateFees?.total_fee_amount).toFixed(4),
          symbol: 'BWG',
        })}
      </Text>
      <Text style={styles.grid}>{t('dashboard.buy.confirm.message-4')}</Text>

      <View style={[styles.grid, {marginBottom: 10}]}>
        <Text style={styles.gridLeftItem}>{t('dashboard.purchaseConfirmModal.received')}</Text>
        <Text style={styles.gridLeftItem}>{parseFloat(estimateFees?.received_amount)} BWG</Text>
      </View>

      <Button
        title={t('dashboard.buy.btnText', {tokenName: 'BWG'})}
        onPress={() => {
          createOrder.mutate({payment_type: 'paypal'})
        }}
        loading={createOrder.isLoading}
        disabled={!isConnected}
      />

      <Button
        title='Bank transfer test'
        containerStyle={{marginTop: 10}}
        onPress={() => navigation.navigate('OrderSummary')}
      />

      {createOrder.data && (
        <NativeModal visible>
          <SafeAreaView>
            <PaypalView data={createOrder.data} onClose={onModalClose} />
          </SafeAreaView>
        </NativeModal>
      )}
    </Modal>
  )
}

const useStyles = makeStyles(({colors}) => ({
  alertContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.bgPaper,
    columnGap: 10,
    height: 40,
    paddingStart: 15,
    borderRadius: 5,
  },
  alertText: {
    fontSize: 16,
  },
  icon: {
    color: colors.warning,
  },
  grid: {
    marginTop: 15,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    fontSize: 16,
    gap: 10,
  },
  gridLeftItem: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '500',
  },
  gridRightItem: {
    flex: 1,
    textAlign: 'right',
    fontSize: 20,
    fontWeight: '500',
  },
}))

export default FiatPaymentModal
