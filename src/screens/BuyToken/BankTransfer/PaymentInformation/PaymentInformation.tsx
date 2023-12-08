import {ScrollView, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Text, makeStyles, Divider, Button} from '@rneui/themed'
import {useRoute, RouteProp, useNavigation, NavigationProp} from '@react-navigation/native'

import ContentContainer from '@core/ContentContainer'
import SafeAreaView from '@core/SafeAreaView'

import {useCurrency} from 'hooks/states'
import PaymentIcon from 'images/icons/Bank.svg'
import InfoIcon from 'images/icons/Info.svg'
import DownloadIcon from 'images/icons/PDF.svg'
import {EstimateFee} from 'api/Response'
import {RouteStack} from 'navigators/routes'

type PaymentParamsList = {
  PaymentInformation: {
    estimateFees: EstimateFee
    inBase: boolean
  }
}

const PaymentInformation = () => {
  const styles = useStyles()
  const {t} = useTranslation()
  const {currency} = useCurrency()
  const route = useRoute<RouteProp<PaymentParamsList, 'PaymentInformation'>>()
  const navigation = useNavigation<NavigationProp<RouteStack>>()
  const {estimateFees, inBase} = route.params

  console.log('estimateFees in payment info', estimateFees, inBase)

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
              <Text style={styles.valueText}>2 BWG</Text>
            </View>
            <View style={[styles.grid, styles.lineHeight]}>
              <Text style={styles.subTittle}>{t('bankTransfer.paymentInfo.total')}</Text>
              <Text style={styles.valueText}>70.72 {currency}</Text>
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
              <Text style={styles.smallText}>{t('bankTransfer.orders.bwg')}</Text>
            </View>
            <Divider width={2} />

            <View style={styles.detailsGrid}>
              <Text style={styles.smallTittle}>{t('bankTransfer.paymentInfo.ibn')}</Text>
              <Text style={styles.smallText}>CH93 0076 2011 6238 5295 7</Text>
            </View>
            <Divider width={2} />

            <View style={styles.detailsGrid}>
              <Text style={styles.smallTittle}>{t('bankTransfer.paymentInfo.bic')}</Text>
              <Text style={styles.smallText}>BQBHCHGGXXX</Text>
            </View>
            <Divider width={2} />

            <View style={styles.detailsGrid}>
              <Text style={styles.smallTittle}>{t('bankTransfer.paymentInfo.number')}</Text>
              <Text style={styles.smallText}>85520364</Text>
            </View>
            <Divider width={2} />

            <View style={styles.detailsGrid}>
              <Text style={styles.smallTittle}>{t('bankTransfer.paymentInfo.bankName')}</Text>
              <Text style={styles.smallText}>Bank Frick</Text>
            </View>
            <Divider width={2} />

            <View style={styles.detailsGrid}>
              <Text style={styles.smallTittle}>{t('bankTransfer.paymentInfo.address')}</Text>
              <Text style={styles.smallText}>Landstrasse 14, 9496 Balzers, Liechtenstein </Text>
            </View>
            <Divider width={2} />

            <Text style={(styles.valueText, {marginTop: 20})}>
              {t('bankTransfer.paymentInfo.ref')}
            </Text>
            <View style={[styles.detailsGrid, {marginTop: 20}]}>
              <Text style={styles.smallTittle}>{t('bankTransfer.paymentInfo.orderID')}</Text>
              <Text style={styles.smallText}>#2256</Text>
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
          />

          <Button
            title={t('bankTransfer.paymentInfo.backToDashboard')}
            containerStyle={{marginBottom: 20}}
            onPress={() => {
              navigation.navigate('Transactions')
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
    marginLeft: 30,
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
