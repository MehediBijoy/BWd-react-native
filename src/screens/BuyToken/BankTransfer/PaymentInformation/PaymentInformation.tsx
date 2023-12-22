import RNPrint from 'react-native-print'
import {useTranslation} from 'react-i18next'
import {ScrollView, View} from 'react-native'
import {useQuery} from '@tanstack/react-query'
import {Text, makeStyles, Divider, Button} from '@rneui/themed'
import {useRoute, RouteProp, useNavigation, NavigationProp} from '@react-navigation/native'

import ContentContainer from '@core/ContentContainer'
import SafeAreaView from '@core/SafeAreaView'

import {cacheKey} from 'api'
import {formatDate, formatNumber} from 'utils'
import {Payment} from 'api/Response'
import {useLocales} from 'hooks/states'
import {RouteStack} from 'navigators/routes'
import {useApi} from 'hooks/api'
import {usePlatform} from 'hooks/helper'
import PaymentIcon from 'images/icons/Bank.svg'
import InfoIcon from 'images/icons/Info.svg'
import DownloadIcon from 'images/icons/PDF.svg'
import {AllCurrencyType} from 'constants/currency.config'

import {html} from '../PaymentInformation/PdfTemplate'

type PaymentParamsList = {
  PaymentInformation: {
    paymentData: Payment
    currency: AllCurrencyType
  }
}

const PaymentInformation = () => {
  const styles = useStyles()

  const api = useApi()
  const {t} = useTranslation()
  const {currentLang} = useLocales()
  const {platform} = usePlatform()
  const navigation = useNavigation<NavigationProp<RouteStack>>()
  const route = useRoute<RouteProp<PaymentParamsList, 'PaymentInformation'>>()

  const {paymentData, currency} = route.params

  const {data} = useQuery({
    queryKey: [cacheKey.bankDetails, paymentData.id, platform],
    queryFn: () => api.getBankDetails(paymentData.id, platform.toLowerCase()),
    enabled: !!paymentData,
  })

  const printHTML = async () => {
    data &&
      (await RNPrint.print({
        html: html({paymentData, bankDetails: data, currency}),
        jobName: `${formatDate(paymentData.created_at, 'YYYY_MM_DD')}_brettonwoods_digital_${
          paymentData.id
        }`,
      }))
  }

  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView>
        <ContentContainer>
          <Text h4 h4Style={{marginTop: 20, fontWeight: '600'}}>
            {t('bankTransfer.paymentInfo.title')}
          </Text>
          <View style={[styles.summary, styles.borderLeft]}>
            <View style={styles.grid}>
              <Text style={styles.subTittle}>{t('bankTransfer.orders.totalPurchase')}</Text>
              <Text style={styles.valueText}>
                {formatNumber(paymentData.received_amount_number, {
                  locales: currentLang,
                  maximumFractionDigits: 4,
                })}{' '}
                BWG
              </Text>
            </View>
            <View style={[styles.grid, styles.lineHeight]}>
              <Text style={styles.subTittle}>{t('bankTransfer.paymentInfo.total')}</Text>
              <Text style={styles.valueText}>
                {paymentData?.total_amount &&
                  formatNumber(paymentData?.total_amount, {
                    locales: currentLang,
                  })}{' '}
                {currency}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.summary,
              {marginTop: 40, flexDirection: 'row', alignItems: 'center', gap: 10},
            ]}
          >
            <PaymentIcon height={30} width={30} />
            <Text style={styles.title}>{t('bankTransfer.paymentInfo.bankTransfer')}</Text>
          </View>

          <View style={styles.details}>
            <Text style={{marginTop: 30}}>{t('bankTransfer.paymentInfo.details')}</Text>

            <View style={styles.detailsGrid}>
              <Text style={styles.smallTittle}>{t('bankTransfer.paymentInfo.name')}</Text>
              <Text style={styles.smallText}>{data?.beneficiary_name}</Text>
            </View>
            <Divider width={2} />

            {/* <View style={styles.detailsGrid}>
              <Text style={styles.smallTittle}>{t('bankTransfer.paymentInfo.ibn')}</Text>
              <Text style={styles.smallText}>{data?.beneficiary_account_number}</Text>
            </View>
            <Divider width={2} /> */}

            <View style={styles.detailsGrid}>
              <Text style={styles.smallTittle}>{t('bankTransfer.paymentInfo.bic')}</Text>
              <Text style={styles.smallText}>{data?.bank_swift_code}</Text>
            </View>
            <Divider width={2} />

            {data?.beneficiary_iban_usd && (
              <>
                <View style={styles.detailsGrid}>
                  <Text style={styles.smallTittle}>{t('bankTransfer.paymentInfo.ibn')}</Text>
                  <Text style={styles.smallText}>
                    {currency === 'USD' ? data.beneficiary_iban_usd : data.beneficiary_iban_eur}
                  </Text>
                </View>
                <Divider width={2} />
              </>
            )}

            {data?.beneficiary_account_number && (
              <>
                <View style={styles.detailsGrid}>
                  <Text style={styles.smallTittle}>{t('bankTransfer.paymentInfo.number')}</Text>
                  <Text style={styles.smallText}>{data?.beneficiary_account_number}</Text>
                </View>
                <Divider width={2} />
              </>
            )}

            <View style={styles.detailsGrid}>
              <Text style={styles.smallTittle}>{t('bankTransfer.paymentInfo.bankName')}</Text>
              <Text style={styles.smallText}>{data?.bank_name}</Text>
            </View>
            <Divider width={2} />

            {/* <View style={styles.detailsGrid}>
              <Text style={styles.smallTittle}>{t('bankTransfer.paymentInfo.address')}</Text>
              <Text style={styles.smallText}>{data?.bank_address}</Text>
            </View>
            <Divider width={2} /> */}

            <Text style={(styles.valueText, {marginTop: 20})}>
              {t('bankTransfer.paymentInfo.ref')}
            </Text>
            <View style={[styles.detailsGrid, {marginTop: 20}]}>
              <Text style={styles.smallTittle}>{t('bankTransfer.paymentInfo.orderID')}</Text>
              <Text style={styles.smallText}>{data?.payment_reference}</Text>
            </View>
          </View>

          <View style={styles.notificationBox}>
            <InfoIcon height={20} width={20} />
            <Text style={[styles.noteDescriptions, {marginTop: -3}]}>
              <Text style={styles.subTittle}>{t('bankTransfer.paymentInfo.noteTitle')}</Text>
              {t('bankTransfer.paymentInfo.note')}
            </Text>
          </View>

          <Button
            icon={<DownloadIcon height={20} width={20} />}
            title={t('bankTransfer.paymentInfo.btn')}
            titleStyle={{marginLeft: 10}}
            color='#7C7C7B'
            containerStyle={{marginTop: 35, marginBottom: 20}}
            onPress={printHTML}
          />

          <Button
            title={t('bankTransfer.paymentInfo.backToDashboard')}
            containerStyle={{marginBottom: 20}}
            onPress={() => {
              navigation.navigate('Home')
            }}
          />
        </ContentContainer>
      </ScrollView>
    </SafeAreaView>
  )
}
export default PaymentInformation

const useStyles = makeStyles(({colors}) => ({
  summary: {
    marginTop: 20,
    marginLeft: 20,
  },
  details: {
    marginLeft: 20,
    marginRight: 30,
  },
  lineHeight: {
    marginTop: 10,
  },
  borderLeft: {
    borderLeftColor: colors.primary,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    columnGap: 50,
    marginLeft: 15,
  },
  subTittle: {
    color: colors.textGray,
    fontSize: 16,
    width: 130,
  },
  valueText: {
    fontSize: 16,
    fontWeight: '800',
  },
  detailsGrid: {
    flexDirection: 'row',
    columnGap: 10,
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  smallTittle: {
    color: colors.textGray,
    fontSize: 12,
    width: 115,
  },
  smallText: {
    fontSize: 12,
    fontWeight: '800',
    flex: 1,
  },
  notificationBox: {
    borderRadius: 8,
    marginTop: 60,
    borderWidth: 1,
    padding: 15,
    borderColor: colors.info,
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'flex-start',
  },
  noteDescriptions: {
    color: colors.textGray,
  },
}))
