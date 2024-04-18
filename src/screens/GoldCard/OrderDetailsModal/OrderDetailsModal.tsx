import {Button, CheckBox, Icon, Text, makeStyles} from '@rneui/themed'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import React from 'react'
import {useMutation} from '@tanstack/react-query'
import {useNavigation, NavigationProp} from '@react-navigation/native'

import Modal from '@core/Modal'
import SafeAreaView from '@core/SafeAreaView'

import PackageSvg from 'images/goldcard/Package.svg'
import FeeSvg from 'images/goldcard/fees.svg'
import PaymentIcon from 'images/icons/Bank.svg'
import {useCurrency, useLocales} from 'hooks/states'
import {alpha, formatCurrency} from 'utils'
import {useApi} from 'hooks/api'
import {GoldCardPackage, Payment} from 'api/Response'
import {AllCurrencyType} from 'constants/currency.config'
import {GoldCardProps} from 'api/Request'

type OrderDetailsModalProps = {
  isOpened: boolean
  isDisabled: boolean
  onClose: () => void
} & GoldCardPackage

type PaymentParamsList = {
  PaymentInformation: {
    paymentData: Payment
    currency: AllCurrencyType
  }
}
const cardOptions = [
  {
    label: 'goldCard.virtual',
    value: 'virtual',
  },
  {
    label: 'goldCard.physical',
    value: 'physical',
  },
  {
    label: 'goldCard.packageOnly',
    value: 'package_only',
  },
]

type ErrorData = {
  code: string
  message: string
  title: string
}

const OrderDetailsModal = ({isOpened, isDisabled, onClose, ...props}: OrderDetailsModalProps) => {
  const {t} = useTranslation()
  const api = useApi()
  const styles = useStyles()
  const [cardType, setCardType] = React.useState('virtual')
  const [errorMessage, setErrorMessage] = React.useState('')

  const {currency} = useCurrency()
  const {currentLang} = useLocales()
  const navigation = useNavigation<NavigationProp<PaymentParamsList, 'PaymentInformation'>>()

  const {
    id,
    package_type,
    price_usd,
    price_eur,
    virtual_price_usd,
    virtual_price_eur,
    card_fee_usd,
    card_fee_eur,
    shipping_cost_usd,
    shipping_cost_eur,
    package_only_price_usd,
    package_only_price_eur,
  } = props

  const physicalPrice = currency === 'USD' ? price_usd : price_eur
  const virtualPrice = currency === 'USD' ? virtual_price_usd : virtual_price_eur
  const cardFee = currency === 'USD' ? card_fee_usd : card_fee_eur
  const shippingFee = currency === 'USD' ? shipping_cost_usd : shipping_cost_eur
  const packageOnlyPrice = currency === 'USD' ? package_only_price_usd : package_only_price_eur

  const totalPrice =
    cardType === 'physical'
      ? physicalPrice
      : cardType === 'virtual'
      ? virtualPrice
      : packageOnlyPrice

  const {mutate, isLoading} = useMutation<Payment, ErrorData, GoldCardProps>({
    mutationFn: api.goldCardPurchase,
    onSuccess: data => {
      onClose()
      navigation.navigate('PaymentInformation', {
        paymentData: data,
        currency: currency,
      })
    },
    onError: error => {
      setErrorMessage(error.message)
    },
  })

  React.useMemo(() => {
    if (package_type !== 'basic' && isDisabled) {
      setCardType('package_only')
    }
  }, [isDisabled, package_type])

  const updatedCardOptions =
    package_type === 'basic'
      ? cardOptions.filter(option => option.value !== 'package_only')
      : cardOptions

  return (
    <SafeAreaView>
      <Modal title={t('goldCard.orderDetails')} isOpened={isOpened} onClose={onClose}>
        {isDisabled && cardType != 'package_only' && (
          <View style={styles.alertContainer}>
            <Icon name='warning' type='antdesign' color={styles.icon.color} />
            <Text style={styles.alertText}>{t('goldCard.not_eligible')}</Text>
          </View>
        )}

        {errorMessage != '' && (
          <View style={[styles.alertContainer]}>
            <Icon name='warning' type='antdesign' color={styles.icon.color} />
            <Text style={styles.alertText}>{errorMessage}</Text>
          </View>
        )}

        <Text style={styles.title}>{t('goldCard.packageDetails')}</Text>
        <View style={styles.packagePrice}>
          <PackageSvg width={20} height={20} />
          <Text style={styles.text}>{t(`goldCard.packageTitleWithLabel.${package_type}`)}</Text>
        </View>
        <Text style={[styles.title, {marginTop: 20}]}>{t('goldCard.cardType')}</Text>
        <View style={styles.radioButton}>
          {updatedCardOptions.map(item => (
            <CheckBox
              key={item.label}
              size={20}
              checkedColor={styles.checkbox.color}
              containerStyle={styles.checkBoxContainer}
              title={t(item.label)}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={item.value === cardType}
              onPress={() => setCardType(item.value)}
            />
          ))}
        </View>
        <View style={styles.packagePrice}>
          <FeeSvg width={30} height={30} />
          <Text style={styles.text}>
            {t('goldCard.packageTotalPrice')}{' '}
            {formatCurrency(Number(totalPrice), {currency, locales: currentLang})}
          </Text>
        </View>

        {cardType === 'physical' && (
          <View style={styles.feeDetails}>
            <View style={styles.feeDetailsBar}></View>
            <View style={{gap: 10}}>
              <Text>
                {t('goldCard.packageFee')}{' '}
                {formatCurrency(Number(physicalPrice) - Number(cardFee) - Number(shippingFee), {
                  currency,
                  locales: currentLang,
                })}{' '}
              </Text>
              <Text>
                {t('goldCard.cardFee')}{' '}
                {formatCurrency(shippingFee, {currency, locales: currentLang})}
              </Text>
              <Text>
                {t('goldCard.shippingFee')}{' '}
                {formatCurrency(cardFee, {currency, locales: currentLang})}
              </Text>
            </View>
          </View>
        )}

        <View style={[styles.bottomGrid, {marginTop: 20}]}>
          <PaymentIcon height={20} width={20} />
          <Text style={styles.text}>{t('goldCard.paymentMethod')}</Text>
        </View>
        <Button
          loading={isLoading}
          title={t('goldCard.confirmPreorder')}
          containerStyle={{marginTop: 20, marginBottom: 20}}
          onPress={() => mutate({id: id, asset: currency, type: cardType})}
          disabled={isDisabled && cardType != 'package_only'}
        />
      </Modal>
    </SafeAreaView>
  )
}

const useStyles = makeStyles(({colors}) => ({
  alertContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: alpha(colors.warning, 0.09),
    columnGap: 10,
    height: 40,
    paddingStart: 5,
    borderRadius: 5,
    borderColor: colors.warning,
    borderWidth: 0.5,
    marginVertical: 10,
  },
  alertText: {
    fontSize: 13,
  },
  icon: {
    color: colors.warning,
  },
  title: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  radioButton: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 0,
  },
  checkbox: {
    color: colors.tertiary,
  },
  checkBoxContainer: {
    justifyContent: 'center',
    padding: 0,
    paddingLeft: 20,
    height: 27,
  },
  feeDetails: {
    flexDirection: 'row',
    marginLeft: 40,
    marginBottom: 10,
    columnGap: 10,
    marginVertical: 10,
  },
  feeDetailsBar: {
    backgroundColor: colors.primary,
    width: 5,
  },
  bottomGrid: {
    flexDirection: 'row',
    columnGap: 10,
  },
  packagePrice: {
    columnGap: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
}))

export default OrderDetailsModal
