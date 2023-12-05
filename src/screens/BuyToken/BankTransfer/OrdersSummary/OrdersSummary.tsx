import {useTranslation} from 'react-i18next'
import {View, ScrollView} from 'react-native'
import {Text, Button, makeStyles} from '@rneui/themed'
import LinearGradient from 'react-native-linear-gradient'
import {useNavigation, NavigationProp, useRoute, RouteProp} from '@react-navigation/native'

import ContentContainer from '@core/ContentContainer'

import {useCurrency, useLocales} from 'hooks/states'
import PaymentIcon from 'images/icons/Bank.svg'
import DepositIcon from 'images/icons/Deposit.svg'
import {EstimateFee} from 'api/Response'
import {formatCurrency} from 'utils'

type RootStackParamList = {
  OrderSummary: {
    estimateFees: EstimateFee
    inBase: boolean
  }
}

type PaymentParamsList = {
  PaymentInformation: {
    estimateFees: EstimateFee
    inBase: boolean
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

const OrderSummary = () => {
  const styles = useStyles()
  const {t} = useTranslation()
  const {currency} = useCurrency()
  const {currentLang} = useLocales()
  const navigation = useNavigation<NavigationProp<PaymentParamsList, 'PaymentInformation'>>()
  const route = useRoute<RouteProp<RootStackParamList, 'OrderSummary'>>()
  const {estimateFees, inBase} = route.params

  console.log('this is the estimate Fees-->', estimateFees)
  console.log('this is inBase-->', inBase)

  return (
    <ScrollView>
      <ContentContainer>
        <Text h4 h4Style={{marginTop: 20}}>
          {t('bankTransfer.orders.title')}
        </Text>

        <View style={styles.orderContainer}>
          <View style={styles.grid}>
            <Text style={[styles.subTittle, {width: 115}]}>
              {t('bankTransfer.orders.totalPurchase')}
            </Text>
            <Text style={styles.valueText}>
              {parseFloat(estimateFees?.received_amount).toFixed(2)} BWG
            </Text>
          </View>
          <View style={[styles.grid, styles.lineHeight]}>
            <Text style={[styles.subTittle, {width: 115}]}>
              {t('bankTransfer.orders.pricePerBWG')}
            </Text>
            <Text style={styles.valueText}>
              {parseFloat(estimateFees?.total_rate).toFixed(4)} {currency}
            </Text>
          </View>
          <LineDesign />
        </View>

        <View style={styles.orderContainer}>
          <View style={[styles.grid, styles.borderLeft]}>
            <Text style={styles.totalText}>{t('bankTransfer.orders.total')}</Text>
            <Text style={styles.totalText}>
              {estimateFees?.total_amount &&
                formatCurrency(estimateFees?.total_amount, {
                  currency,
                  locales: currentLang,
                })}{' '}
              {currency}
            </Text>
          </View>
          <LineDesign />
        </View>
        <View style={[styles.bottomGrid, {marginTop: 30, marginLeft: 35}]}>
          <View style={{flexDirection: 'row', gap: 10, width: 115}}>
            <PaymentIcon height={20} width={20} />
            <Text style={styles.subTittle}>{t('bankTransfer.orders.paymentBy')}</Text>
          </View>
          <Text style={styles.valueText}>{t('bankTransfer.orders.method')}</Text>
        </View>
        <View style={[styles.bottomGrid, {marginTop: 20, marginLeft: 35}]}>
          <View style={{flexDirection: 'row', gap: 10, width: 115}}>
            <DepositIcon height={20} width={20} />
            <Text style={styles.subTittle}>{t('bankTransfer.orders.deposit')}</Text>
          </View>
          <Text style={styles.valueText}>{t('bankTransfer.orders.bwg')}</Text>
        </View>

        <Button
          title={t('bankTransfer.orders.btn')}
          containerStyle={{marginTop: 100}}
          onPress={() => {
            navigation.navigate('PaymentInformation', {
              estimateFees: estimateFees,
              inBase: inBase,
            })
          }}
        />
      </ContentContainer>
    </ScrollView>
  )
}

export default OrderSummary

const useStyles = makeStyles(({colors}) => ({
  orderContainer: {
    marginTop: 40,
    marginLeft: 40,
  },
  borderLeft: {
    borderLeftColor: colors.primary,
    borderLeftWidth: 4,
  },
  lineHeight: {
    marginTop: 20,
  },
  grid: {
    flexDirection: 'row',
    columnGap: 50,
  },
  bottomGrid: {
    flexDirection: 'row',
    columnGap: 30,
  },
  subTittle: {
    color: colors.textGray,
    fontSize: 16,
  },
  valueText: {
    fontSize: 16,
    fontWeight: '800',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 15,
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
}))
