import React from 'react'
import {Button, Icon, makeStyles} from '@rneui/themed'
import {useMutation} from '@tanstack/react-query'
import {Text, View, Modal as NativeModal} from 'react-native'
import {useWalletConnectModal} from '@walletconnect/modal-react-native'

import Modal from '@core/Modal'

import {useApi} from 'hooks/api'
import {PaymentProps} from 'api/Request'
import {EstimateFee, Payment} from 'api/Response'

import PaypalView from '../PaypalView'

type FiatPaymentModalProps = {
  estimateFees: EstimateFee
  isOpened: boolean
  onClose: () => void
  in_base: boolean
}

const FiatPaymentModal = ({estimateFees, isOpened, onClose, in_base}: FiatPaymentModalProps) => {
  const api = useApi()
  const styles = useStyles()
  const {isConnected} = useWalletConnectModal()
  const [isOrder, setIsOrder] = React.useState<boolean>(false)

  const createOrder = useMutation<Payment, any, Pick<PaymentProps, 'payment_type'>>({
    mutationFn: ({payment_type}) =>
      api.createPayment({
        asset: 'USD',
        target_asset: 'BWG',
        amount: in_base ? estimateFees.total_amount : estimateFees.received_amount,
        in_base,
        payment_type,
      }),
    onSuccess: onClose,
  })

  return (
    <>
      <Modal title='ORDER DETAILS' isOpened={isOpened} onClose={onClose}>
        {!isConnected && (
          <View style={styles.alertContainer}>
            <Icon name='warning' color={styles.icon.color} />
            <Text style={styles.alertText}>Please connect your crypto wallet</Text>
          </View>
        )}

        <View style={styles.grid}>
          <Text style={styles.gridLeftItem}>Amount</Text>
          <Text style={styles.gridRightItem}>${estimateFees?.total_amount}</Text>
        </View>

        <Text style={styles.grid}>
          You are paying up front for {estimateFees?.storage_fee_remaining_days} days of storage for
          your gold backing the token. The cost for this are
          {parseFloat(estimateFees?.storage_fee_amount).toFixed(4)} BWG tokens.
        </Text>

        <Text style={styles.grid}>
          You`re paying {parseFloat(estimateFees?.total_fee_amount).toFixed(4)} BWG tokens fees.
        </Text>
        <Text style={styles.grid}>After completion you`re going to</Text>

        <View style={[styles.grid, {marginBottom: 10}]}>
          <Text style={styles.gridLeftItem}>Receive:</Text>
          <Text style={styles.gridLeftItem}>{parseFloat(estimateFees?.received_amount)} BWG</Text>
        </View>

        <Button
          title='Buy BWG'
          onPress={() => {
            setIsOrder(true)
            createOrder.mutate({payment_type: 'paypal'})
          }}
          loading={createOrder.isLoading}
          disabled={!isConnected}
        />
      </Modal>

      {isOrder && createOrder.data && (
        <NativeModal visible>
          <PaypalView
            data={createOrder.data.payment_data}
            isLoading={createOrder.isLoading}
            onClose={() => {
              setIsOrder(false)
              createOrder.reset()
            }}
          />
        </NativeModal>
      )}
    </>
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
