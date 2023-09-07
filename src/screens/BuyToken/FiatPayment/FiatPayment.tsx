import React from 'react'
import {Text, View} from 'react-native'
import {makeStyles} from '@rneui/themed'

import Modal from '@core/Modal'

import {EstimateFee} from 'api/Response'

const useStyles = makeStyles(() => ({
  assetGrid: {
    marginTop: 15,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    fontSize: 16,
    gap: 10,
  },
  gridLeft: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '500',
  },
  gridRight: {
    flex: 1,
    textAlign: 'right',
    fontSize: 20,
    fontWeight: '500',
  },
}))

type FiatPaymentModalProps = {
  estimateFees: EstimateFee
  isOpened: boolean
  onClose: () => void
}

const FiatPaymentModal = ({estimateFees, isOpened, onClose}: FiatPaymentModalProps) => {
  const styles = useStyles()
  console.log(estimateFees)

  return (
    <Modal title='ORDER DETAILS' isOpened={isOpened} onClose={onClose}>
      <View style={styles.assetGrid}>
        <Text style={styles.gridLeft}>Amount</Text>
        <Text style={styles.gridRight}>${estimateFees?.total_amount}</Text>
      </View>

      <Text style={styles.assetGrid}>
        You are paying up front for {estimateFees?.storage_fee_remaining_days} days of storage for
        your gold backing the token. The cost for this are
        {parseFloat(estimateFees?.storage_fee_amount).toFixed(4)} BWG tokens.
      </Text>

      <Text style={styles.assetGrid}>
        You`re paying {parseFloat(estimateFees?.total_fee_amount).toFixed(4)} BWG tokens fees.
      </Text>
      <Text style={styles.assetGrid}>After completion you`re going to</Text>

      <View style={styles.assetGrid}>
        <Text style={styles.gridLeft}>Receive:</Text>
        <Text style={styles.gridLeft}>{parseFloat(estimateFees?.received_amount)} BWG</Text>
      </View>

      {/* <Button
        title='Buy BWG'
        disabled={!isValid}
        onPress={() => {
          setIsFiatModalOpened(true)
        }}
      /> */}
    </Modal>
  )
}

export default FiatPaymentModal
