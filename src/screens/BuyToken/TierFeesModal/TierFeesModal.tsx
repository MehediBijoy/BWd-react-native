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

const useStyles = makeStyles(() => ({
  assetGrid: {
    marginTop: 20,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  gridItem: {
    flex: 1,
    textAlign: 'center',
  },
}))

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
      <View style={styles.assetGrid}>
        <Text style={styles.gridItem}>Tier</Text>
        <Text style={styles.gridItem}>Amount</Text>
        <Text style={styles.gridItem}>Fee</Text>
      </View>

      {fees?.map(({id, min, max, fee_percentage}: any) => (
        <View key={id} style={styles.assetGrid}>
          <Text style={styles.gridItem}>Level {id + 1}</Text>
          <Text style={styles.gridItem}>
            {' '}
            {id === 0 ? `from ${bwgLimit?.min_payment_amount} up to ${max}` : `from ${min}`}
          </Text>
          <Text style={styles.gridItem}>{fee_percentage}%</Text>
        </View>
      ))}
    </Modal>
  )
}

export default TierOverviewModal
