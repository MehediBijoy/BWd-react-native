import {useTranslation} from 'react-i18next'
import {View, ScrollView} from 'react-native'
import {useMutation} from '@tanstack/react-query'
import {Text, Button, makeStyles} from '@rneui/themed'
import LinearGradient from 'react-native-linear-gradient'
import {useNavigation, NavigationProp, useRoute, RouteProp} from '@react-navigation/native'

import ContentContainer from '@core/ContentContainer'

import {formatNumber} from 'utils'
import {useApi} from 'hooks/api'
import {useCurrency, useLocales} from 'hooks/states'
import {EstimateFee, Payment} from 'api/Response'
import PaymentIcon from 'images/icons/Bank.svg'
import DepositIcon from 'images/icons/Deposit.svg'
import {PaymentProps} from 'api/Request'

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
  const api = useApi()
  const styles = useStyles()
  const {t} = useTranslation()
  const {currency} = useCurrency()
  const {currentLang} = useLocales()
  const navigation = useNavigation<NavigationProp<PaymentParamsList, 'PaymentInformation'>>()
  const route = useRoute<RouteProp<RootStackParamList, 'OrderSummary'>>()
  const {estimateFees, inBase} = route.params

  const createOrder = useMutation<Payment, unknown, Pick<PaymentProps, 'payment_type'>>({
    mutationFn: ({payment_type}) =>
      api.createPayment({
        asset: currency,
        target_asset: 'BWG',
        amount: inBase ? estimateFees.total_amount : estimateFees.received_amount,
        in_base: inBase,
        payment_type,
        success_url: 'https://www.brettonwoods.gold/',
        error_url: 'https://example.com',
      }),
  })

  return (
    <ScrollView>
      <ContentContainer>
        <Text h4 h4Style={{marginTop: 20}}>
          {t('bankTransfer.orders.title')}
        </Text>

        <View style={styles.orderContainer}>
          <View style={styles.grid}>
            <Text style={[styles.subTittle, {width: 125}]}>
              {t('bankTransfer.orders.totalPurchase')}
            </Text>
            <Text style={styles.valueText}>
              {formatNumber(estimateFees?.received_amount, {
                locales: currentLang,
                maximumFractionDigits: 4,
              })}{' '}
              BWG
            </Text>
          </View>
          <View style={[styles.grid, styles.lineHeight]}>
            <Text style={[styles.subTittle, {width: 125}]}>
              {t('bankTransfer.orders.pricePerBWG')}
            </Text>
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
            <Text style={[styles.totalText, {width: 60}]}>{t('bankTransfer.orders.total')}</Text>
            <Text style={styles.totalText}>
              {estimateFees?.total_amount &&
                formatNumber(estimateFees?.total_amount, {
                  locales: currentLang,
                })}{' '}
              {currency}
            </Text>
          </View>
          <LineDesign />
        </View>
        <View style={[styles.bottomGrid, {marginTop: 30, marginLeft: 15}]}>
          <View style={{flexDirection: 'row', gap: 10, width: 120}}>
            <PaymentIcon height={20} width={20} />
            <Text style={styles.subTittle}>{t('bankTransfer.orders.paymentBy')}</Text>
          </View>
          <Text style={styles.valueText}>{t('bankTransfer.orders.method')}</Text>
        </View>
        <View style={[styles.bottomGrid, {marginTop: 20, marginLeft: 15}]}>
          <View style={{flexDirection: 'row', gap: 10, width: 120}}>
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
    marginLeft: 20,
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
