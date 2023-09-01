import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'

import AvailableBalanceRow from './availableBalanceRow'

const BalanceBox = () => {
  const styles = useStyles()

  return (
    <View style={styles.balanceBox}>
      <Text h3>Your Balance</Text>
      <View style={styles.assetGrid}>
        <Text style={styles.gridItem} />
        <Text style={styles.gridItem}>Price</Text>
        <Text style={styles.gridItem}>Amount</Text>
        <Text style={styles.gridItem}>Total</Text>
      </View>
      <AvailableBalanceRow asset='BWG' isLoading={true} />
      <AvailableBalanceRow asset='BNB' />
    </View>
  )
}

export default BalanceBox

const useStyles = makeStyles(({colors}) => ({
  balanceBox: {
    marginTop: 20,
    marginBottom: 20,
  },
  assetGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItem: {
    flex: 1,
    textAlign: 'center',
  },
}))
