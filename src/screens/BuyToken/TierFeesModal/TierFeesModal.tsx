import React, {useMemo} from 'react'
import {ScrollView, Text, View} from 'react-native'
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
      <ScrollView>
        <View style={[styles.container, styles.tableBorder]}>
          <View style={styles.headerRow}>
            <Text style={styles.tierItem}>Tier</Text>
            <Text style={styles.tierDescription}>Amount</Text>
            <Text style={styles.tierFee}>Fee</Text>
          </View>
          {fees?.map(({id, min, max, fee_percentage}: any, index: number) => (
            <View key={id} style={index === fees?.length - 1 ? styles.rowWithRadius : styles.row}>
              <Text style={styles.tierItem}>Level {id + 1}</Text>
              <Text style={styles.tierDescription}>
                {' '}
                {id === 0 ? `from ${bwgLimit?.min_payment_amount} up to ${max}` : `from ${min}`}
              </Text>
              <Text style={styles.tierFee}>{fee_percentage}%</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Modal>
  )
}

export default TierOverviewModal
const useStyles = makeStyles(({colors}) => ({
  container: {
    backgroundColor: colors.background,
    marginVertical: 10,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },

  headerRow: {
    padding: 5,
    backgroundColor: colors.bgPaper,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.divider,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  row: {
    padding: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderColor: colors.divider,
  },
  rowWithRadius: {
    padding: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
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
