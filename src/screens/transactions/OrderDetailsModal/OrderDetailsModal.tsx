import React from 'react'
import {View, Linking, TouchableOpacity, ScrollView} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'

import Modal from '@core/Modal'
import CopyButton from '@core/CopyButton'
import StatusBadge from '@core/StatusBadge'

import {Payment, Transfer} from 'api/Response'
import {formatDate, shortAddress} from 'utils'
import {EXPLORER_URL} from 'config/environments'

export type OrderDetailsModalProps = {
  isOpened: boolean
  data: Payment<Transfer>
  onClose: () => void
}

const OrderDetailsModal = ({data, isOpened, onClose}: OrderDetailsModalProps) => {
  const styles = useStyles()

  const onExplorerClicked = (txHash: string) => {
    Linking.openURL(EXPLORER_URL + 'tx/' + txHash)
  }

  return (
    <Modal title='ORDER DETAILS' isOpened={isOpened} onClose={onClose}>
      <ScrollView>
        <View style={{marginBottom: 30}}>
          <View style={styles.row}>
            <Text style={styles.label}>Date </Text>
            <Text>{formatDate(data.created_at)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Order ID </Text>
            <Text>{data?.id}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Trade Pair</Text>
            <Text style={[styles.labelRight]}>{data?.trade_pair}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Paid </Text>
            <Text style={styles.labelRight}>{data?.paid_amount}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Received</Text>
            <Text style={styles.labelRight}>{data?.received_amount}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Payment Type</Text>
            <Text style={[styles.labelRight]}>{data?.payment_type}</Text>
          </View>
          {data?.transfer?.tx_hash && (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Block Explorer</Text>
                <TouchableOpacity activeOpacity={0.8}>
                  <Text
                    style={styles.explorer}
                    onPress={() => onExplorerClicked(data.transfer.tx_hash)}
                  >
                    View in Block Explorer
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Sender</Text>
                <Text style={[styles.labelRight]}>{shortAddress(data.transfer.sender, 8)}</Text>
                <View style={{alignItems: 'flex-end'}}>
                  <CopyButton toCopy={data.transfer.sender} />
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Recipient</Text>
                <Text style={[styles.labelRight]}>{shortAddress(data.transfer.recipient, 8)}</Text>
                <View style={{alignItems: 'flex-end'}}>
                  <CopyButton toCopy={data.transfer.recipient} />
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Tx Hash</Text>
                <Text style={[styles.labelRight]}>{shortAddress(data.transfer.tx_hash, 8)}</Text>
                <View style={{alignItems: 'flex-end'}}>
                  <CopyButton toCopy={data.transfer.tx_hash} />
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Payment Status</Text>
                <Text style={[styles.labelRight]}>
                  <StatusBadge status={data.status} />
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Transfer Status</Text>
                <Text style={[styles.labelRight]}>
                  <StatusBadge status={data.transfer.status} />
                </Text>
              </View>
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
