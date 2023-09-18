import React from 'react'
import {View, Linking, TouchableOpacity} from 'react-native'
import {Badge, Text, makeStyles} from '@rneui/themed'

import Modal from '@core/Modal'
import CopyButton from '@core/CopyButton'

import {Payment, Transfer} from 'api/Response'
import {formatDate, shortAddress} from 'utils'
import {EXPLORER_URL} from 'config/environments'

export type OrderDetailsModalProps = {
  isOpened: boolean
  selectedRow: Payment<Transfer>
  onClose: () => void
}

const OrderDetailsModal = ({selectedRow, isOpened, onClose}: OrderDetailsModalProps) => {
  const styles = useStyles()

  const onExplorerClicked = (txHash: string) => {
    Linking.openURL(EXPLORER_URL + 'tx/' + txHash)
  }

  return (
    <Modal title='ORDER DETAILS' isOpened={isOpened} onClose={onClose}>
      <View style={styles.row}>
        <Text style={styles.label}>Date </Text>
        <Text>{formatDate(new Date(selectedRow.created_at), 'long')}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Order ID </Text>
        <Text>{selectedRow.id}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Trade Pair</Text>
        <Text style={[styles.labelRight]}>{selectedRow.trade_pair}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Paid </Text>
        <Text style={styles.labelRight}>{selectedRow.paid_amount}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Received</Text>
        <Text style={styles.labelRight}>{selectedRow.received_amount}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Payment Type</Text>
        <Text style={[styles.labelRight]}>{selectedRow.payment_type}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Block Explorer</Text>

        <TouchableOpacity activeOpacity={0.8}>
          <Text
            style={styles.explorer}
            onPress={() => onExplorerClicked(selectedRow.transfer.tx_hash)}
          >
            View in Block Explorer
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Sender</Text>
        <Text style={[styles.labelRight]}>{shortAddress(selectedRow.transfer.sender, 12)}</Text>
        <View style={{alignItems: 'flex-end'}}>
          <CopyButton toCopy={selectedRow.transfer.sender} />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Recipient</Text>
        <Text style={[styles.labelRight]}>{shortAddress(selectedRow.transfer.recipient, 12)}</Text>
        <View style={{alignItems: 'flex-end'}}>
          <CopyButton toCopy={selectedRow.transfer.recipient} />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tx Hash</Text>
        <Text style={[styles.labelRight]}>{shortAddress(selectedRow.transfer.tx_hash, 12)}</Text>
        <View style={{alignItems: 'flex-end'}}>
          <CopyButton toCopy={selectedRow.transfer.tx_hash} />
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Payment Status</Text>
        <Text style={[styles.labelRight]}>
          <Badge
            status={
              selectedRow.status == 'pending' || selectedRow.status == 'accepted'
                ? 'warning'
                : 'success'
            }
            badgeStyle={{height: 22, borderRadius: 5}}
            value={selectedRow.status.toUpperCase()}
          />
        </Text>
      </View>
      {selectedRow.transfer && (
        <View style={styles.row}>
          <Text style={styles.label}>Transfer Status</Text>
          <Text style={[styles.labelRight]}>
            <Badge
              status={
                selectedRow.transfer.status == 'pending' ||
                selectedRow.transfer.status == 'accepted'
                  ? 'warning'
                  : 'success'
              }
              badgeStyle={{height: 22, borderRadius: 5}}
              value={selectedRow.transfer.status.toUpperCase()}
            />
          </Text>
        </View>
      )}
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
    width: 100,
    textAlign: 'left',
    fontWeight: '600',
  },
  labelRight: {
    textAlign: 'left',
  },
  explorer: {
    color: colors.tertiary,
  },
}))
