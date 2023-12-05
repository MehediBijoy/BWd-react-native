import React from 'react'
import {useMutation} from '@tanstack/react-query'
import {useTranslation} from 'react-i18next'
import {View, Modal as NativeModal, TouchableWithoutFeedback, ActivityIndicator} from 'react-native'
import {Button, Icon, makeStyles, Text} from '@rneui/themed'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'
import {useNavigation, NavigationProp} from '@react-navigation/native'

import Modal from '@core/Modal'
import SafeAreaView from '@core/SafeAreaView'

import {useApi} from 'hooks/api'
import {formatCurrency} from 'utils'
import {useDebounce} from 'hooks/helper'
import {PaymentProps} from 'api/Request'
import {EstimateFee, Payment} from 'api/Response'
import {useCurrency, useLocales} from 'hooks/states'
import PaypalImg from 'images/icons/paypal.svg'
import BankPayment from 'images/icons/bankPayment.svg'

import PaypalView from '../PaypalView'

type FiatPaymentModalProps = {
  estimateFees: EstimateFee
  isOpened: boolean
  onClose: () => void
  in_base: boolean
}
type RootStackParamList = {
  OrderSummary: {
    estimateFees: EstimateFee
    inBase: boolean
  }
}

const FiatPaymentModal = ({estimateFees, isOpened, onClose, in_base}: FiatPaymentModalProps) => {
  const api = useApi()
  const styles = useStyles()
  const {t} = useTranslation()
  const {currency} = useCurrency()
  const {currentLang} = useLocales()
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'OrderSummary'>>()

  const {isConnected} = useWalletConnectModal()

  const createOrder = useMutation<Payment, unknown, Pick<PaymentProps, 'payment_type'>>({
    mutationFn: ({payment_type}) =>
      api.createPayment({
        asset: currency,
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
        <Text style={styles.gridRightItem}>
          {estimateFees?.total_amount &&
            formatCurrency(estimateFees?.total_amount, {
              currency,
              locales: currentLang,
            })}
        </Text>
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

      <View style={[styles.grid, {marginBottom: 10, justifyContent: 'center'}]}>
        <Text style={styles.gridLeftItem}>{t('dashboard.purchaseConfirmModal.received')}</Text>
        <Text style={styles.receiveText}>{parseFloat(estimateFees?.received_amount)} BWG</Text>
      </View>

      <View style={{flexDirection: 'row', columnGap: 50, justifyContent: 'center'}}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (isConnected) {
              onClose()
              navigation.navigate('OrderSummary', {
                estimateFees: estimateFees,
                inBase: in_base,
              })
            }
          }}
        >
          <View style={[styles.paypalBtnWrapper, {padding: 5}]}>
            <BankPayment height={30} width={30} />
            <Text style={{fontSize: 10}}>{t('bankTransfer.paymentInfo.transferBtn')}</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => isConnected && createOrder.mutate({payment_type: 'paypal'})}
        >
          <View style={styles.paypalBtnWrapper}>
            {createOrder.isLoading ? <ActivityIndicator /> : <PaypalImg height={60} width={60} />}
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* <Button
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
        onPress={() => {
          onClose()
          navigation.navigate('OrderSummary', {
            estimateFees: estimateFees,
            inBase: in_base,
          })
        }}
      /> */}

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
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  gridRightItem: {
    flex: 1,
    textAlign: 'right',
    fontSize: 20,
    fontWeight: '500',
  },
  receiveText: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.primary,
  },
  paypalBtnWrapper: {
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 1.5,
    borderRadius: 8,
    height: 80,
    width: 100,
    borderColor: colors.divider,
    columnGap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export default FiatPaymentModal
