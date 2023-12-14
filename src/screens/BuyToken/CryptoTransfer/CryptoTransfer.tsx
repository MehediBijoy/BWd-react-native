import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Button, Text, makeStyles} from '@rneui/themed'
import LinearGradient from 'react-native-linear-gradient'
import {RouteProp, useRoute} from '@react-navigation/native'

import ContainContainer from '@core/ContentContainer'

import {formatNumber} from 'utils'
import {EstimateFee} from 'api/Response'
import {useLocales} from 'hooks/states'
import InfoIcon from 'images/icons/Info.svg'
import WalletIcon from 'images/icons/Wallet.svg'
import PaymentIcon from 'images/icons/CryptoPayment.svg'
import {CryptoCurrencyTypes} from 'constants/currency.config'

type CryptoStackParamList = {
  CryptoPayment: {
    estimateFees: EstimateFee
    inBase: boolean
    currency: CryptoCurrencyTypes
  }
}

const LineDesign = () => {
  const styles = useStyles()
  return (
    <LinearGradient
      colors={[
        'rgba(217, 217, 217, 0.00)',
        '#D9D9D9',
        'rgba(217, 217, 217, 0.81)',
        'rgba(217, 217, 217, 0.00)',
      ]}
      locations={[0.035, 0.1676, 0.7054, 0.8738]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.line}
    >
      <View style={styles.linContent} />
    </LinearGradient>
  )
}

const CryptoTransfer = () => {
  const styles = useStyles()
  const {t} = useTranslation()
  const {currentLang} = useLocales()
  const route = useRoute<RouteProp<CryptoStackParamList, 'CryptoPayment'>>()
  const {estimateFees, inBase, currency} = route.params

  return (
    <ContainContainer>
      <View style={styles.notificationBox}>
        <InfoIcon height={20} width={20} />

        <View style={{marginLeft: 10, paddingRight: 12, marginTop: -3}}>
          <Text style={[styles.noteDescriptions]}>
            {t('dashboard.buy.confirm.message-1', {
              duration: estimateFees?.storage_fee_remaining_days,
              token: formatNumber(estimateFees?.storage_fee_amount, {
                locales: currentLang,
                maximumFractionDigits: 4,
              }),
              symbol: 'BWG',
            })}
          </Text>
          <Text style={[styles.noteDescriptions]}>
            {t('dashboard.buy.confirm.message-2', {
              token: formatNumber(estimateFees?.total_fee_amount, {
                locales: currentLang,
                maximumFractionDigits: 4,
              }),
              symbol: 'BWG',
            })}
          </Text>
        </View>
      </View>

      <Text h4 h4Style={{marginTop: 20, fontWeight: '600'}}>
        {t('cryptoTransfer.title')}
      </Text>

      <View style={styles.orderContainer}>
        <View style={styles.grid}>
          <Text style={styles.subTittle}>{t('bankTransfer.orders.totalPurchase')}</Text>
          <Text style={styles.valueText}>
            {formatNumber(estimateFees?.received_amount, {
              locales: currentLang,
              maximumFractionDigits: 4,
            })}{' '}
            BWG
          </Text>
        </View>
        <View style={[styles.grid, styles.lineHeight]}>
          <Text style={styles.subTittle}>{t('bankTransfer.orders.pricePerBWG')}</Text>
          <Text style={styles.valueText}>
            {formatNumber(estimateFees?.total_rate, {
              locales: currentLang,
              maximumFractionDigits: 2,
            })}{' '}
            {currency}
          </Text>
        </View>
        <LineDesign />
      </View>

      <View style={styles.orderContainer}>
        <View style={[styles.grid, styles.borderLeft]}>
          <Text style={[styles.totalText, {width: 80}]}>{t('bankTransfer.orders.total')}</Text>
          <Text style={styles.totalText}>
            {estimateFees?.total_amount && estimateFees?.total_amount} {currency}
          </Text>
        </View>
        <LineDesign />
      </View>

      <View style={[styles.bottomGrid, {marginTop: 30, marginLeft: 15}]}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <PaymentIcon height={20} width={20} />
          <Text style={styles.subTittle}>{t('bankTransfer.orders.paymentBy')}</Text>
        </View>
        <Text style={styles.valueText}>{t('bankTransfer.orders.method')}</Text>
      </View>
      <View style={[styles.bottomGrid, {marginTop: 20, marginLeft: 15}]}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <WalletIcon height={20} width={20} />
          <Text style={[styles.subTittle]}>{t('cryptoTransfer.connectedWallet')}</Text>
        </View>
        <Text style={styles.valueText}>0xA2959D3F95eAe5dC7D70144Ce1b73b403b7EB6E0</Text>
      </View>

      <Button title={t('bankTransfer.orders.btn')} containerStyle={{marginTop: 50}} />
    </ContainContainer>
  )
}

export default CryptoTransfer

const useStyles = makeStyles(({colors}) => ({
  notificationBox: {
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderColor: colors.info,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  noteDescriptions: {
    fontSize: 10,
    color: colors.textGray,
    lineHeight: 15,
  },
  bottomGrid: {
    flexDirection: 'row',
    columnGap: 25,
  },
  lineHeight: {
    marginTop: 20,
  },
  subTittle: {
    color: colors.textGray,
    fontSize: 16,
    width: 130,
  },
  orderContainer: {
    marginTop: 40,
    marginLeft: 20,
  },
  grid: {
    flexDirection: 'row',
    columnGap: 50,
  },
  valueText: {
    fontSize: 16,
    fontWeight: '800',
  },
  line: {
    marginTop: 40,
    height: 2,
    width: '100%',
  },
  linContent: {
    height: '100%',
    width: '100%',
  },
  borderLeft: {
    borderLeftColor: colors.primary,
    borderLeftWidth: 4,
  },
  totalText: {
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 15,
  },
}))
