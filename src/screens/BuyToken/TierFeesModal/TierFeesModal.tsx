import React, {useMemo} from 'react'
import {Text, View} from 'react-native'
import {makeStyles} from '@rneui/themed'

import Modal from '@core/Modal'

import useDynamicFees from 'hooks/helper/useDynamicFees'
import {DynamicFee} from 'api/Response'

type TierOverviewModalProps = {
  isOpened: boolean
  onClose: () => void
  bwgLimit: any
}

const TierOverviewModal = ({bwgLimit, isOpened, onClose}: TierOverviewModalProps) => {
  const styles = useStyles()
  const {data}: any = useDynamicFees()
  const fees = useMemo(
    () =>
      data?.reduce(
        (acc: DynamicFee[], curr: DynamicFee, index: number, arr: DynamicFee[]) => [
          ...acc,
          {...curr, id: index, min: curr?.minimum_value, max: arr[index + 1]?.minimum_value},
        ],
        []
      ),
    [data]
  )

  return (
    <Modal title='FEE TIERS OVERVIEW' isOpened={isOpened} onClose={onClose}>
      <View style={[styles.container, styles.tableBorder]}>
        <View style={styles.headerRow}>
          <Text style={styles.tierItem}>Tier</Text>
          <Text style={styles.tierDescription}>Amount</Text>
          <Text style={styles.tierFee}>Fee</Text>
        </View>

        {fees?.map(({id, min, max, fee_percentage}: any) => (
          <View key={id} style={styles.row}>
            <Text style={styles.tierItem}>Level {id + 1}</Text>
            <Text style={styles.tierDescription}>
              {' '}
              {id === 0 ? `from ${bwgLimit?.min_payment_amount} up to ${max}` : `from ${min}`}
            </Text>
            <Text style={styles.tierFee}>{fee_percentage}%</Text>
          </View>
        ))}
      </View>
    </Modal>
  )
}

export default TierOverviewModal
const useStyles = makeStyles(({colors}) => ({
  container: {
    backgroundColor: colors.white,
    marginTop: 10,
  },
  tableBorder: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
  },

  headerRow: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },

  row: {
    padding: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  tierDescription: {
    color: colors.textPrimary,
    width: '50%',
    textAlign: 'left',
  },
  tierItem: {
    color: colors.textPrimary,
    width: '25%',
    textAlign: 'left',
  },
  tierFee: {
    color: colors.textPrimary,
    width: '25%',
    textAlign: 'right',
  },
}))
