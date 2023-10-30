import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Text, makeStyles} from '@rneui/themed'

import Logo from 'components/Logo'
import {useBalance} from 'hooks/crypto'
import BnbLogo from 'images/BNB.svg'

import AvailableBalanceRow from './availableBalanceRow'

const BalanceBox = () => {
  const styles = useStyles()
  const {t} = useTranslation()
  const {balance: BnbBalance, isLoading} = useBalance()
  const {balance: BwgBalance, isLoading: bwgLoading} = useBalance({token: 'BWG', watch: true})

  return (
    <View style={styles.balanceBox}>
      <Text h3>{t('dashboard.availableBalance.title')}</Text>
      <View style={styles.assetGrid}>
        <Text style={styles.gridItem} />
        <Text style={styles.gridItem}>{t('dashboard.availableBalance.price')}</Text>
        <Text style={styles.gridItem}>{t('dashboard.availableBalance.amount')}</Text>
        <Text style={styles.gridItem}>{t('dashboard.availableBalance.total')}</Text>
      </View>
      <AvailableBalanceRow
        asset='BWG'
        logo={<Logo height={35} width={35} />}
        isLoading={bwgLoading}
        data={BwgBalance}
      />
      <AvailableBalanceRow
        asset='BNB'
        logo={
          <View style={{borderRadius: 50, overflow: 'hidden', width: 35, height: 35}}>
            <BnbLogo height={35} width={35} />
          </View>
        }
        isLoading={isLoading}
        data={BnbBalance}
      />
    </View>
  )
}

export default BalanceBox

const useStyles = makeStyles(() => ({
  balanceBox: {
    marginTop: 20,
    marginBottom: 20,
  },
  assetGrid: {
    marginTop: 20,
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
