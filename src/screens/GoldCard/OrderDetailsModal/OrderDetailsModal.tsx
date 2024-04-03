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
import {PackageType, Payment} from 'api/Response'
import {AllCurrencyType} from 'constants/currency.config'
import {GoldCardProps} from 'api/Request'

type OrderDetailsModalProps = {
  isOpened: boolean
  isDisabled: boolean
  id: number
  price: string
  package_type: string

  onClose: () => void
}

type PaymentParamsList = {
  PaymentInformation: {
    paymentData: Payment
    currency: AllCurrencyType
  }
}
const cardOptions = [
  {
    label: 'Physical',
    value: 1,
  },
  {
    label: 'Virtual',
    value: 0,
  },
]

type ErrorData = {
  code: string
  message: string
  title: string
}

const OrderDetailsModal = ({
  isOpened,
  isDisabled,
  id,
  price,
  package_type,
  onClose,
}: OrderDetailsModalProps) => {
  const {t} = useTranslation()
  const api = useApi()
  const styles = useStyles()
  const [cardType, setCardType] = React.useState(0)
  const [errorMessage, setErrorMessage] = React.useState('')

  const {currency} = useCurrency()
  const {currentLang} = useLocales()
  const navigation = useNavigation<NavigationProp<PaymentParamsList, 'PaymentInformation'>>()

  const {mutate, isLoading} = useMutation<Payment, ErrorData, GoldCardProps>({
    mutationFn: api.goldCardPurchase,
    onSuccess: data => {
      navigation.navigate('PaymentInformation', {
        paymentData: data,
        currency: currency,
      })
    },
    onError: error => {
      setErrorMessage(error.message)
    },
  })

  return (
    <SafeAreaView>
      <Modal title={t('goldCard.orderDetails')} isOpened={isOpened} onClose={onClose}>
        {isDisabled && (
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
          {cardOptions.map(item => (
            <View key={item.label}>
              <CheckBox
                size={20}
                checkedColor={styles.checkbox.color}
                containerStyle={styles.checkBoxContainer}
                title={item.label}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={item.value === cardType}
                onPress={() => setCardType(item.value)}
              />
            </View>
          ))}
        </View>
        <View style={styles.packagePrice}>
          <FeeSvg width={30} height={30} />
          <Text style={styles.text}>
            {t('goldCard.packageTotalPrice')}{' '}
            {formatCurrency(price, {currency, locales: currentLang})}
          </Text>
        </View>
        {cardType === 1 && (
          <View style={styles.feeDetails}>
            <View style={styles.feeDetailsBar}></View>
            <View style={{gap: 10}}>
              <Text>
                {t('goldCard.packageFee')}{' '}
                {formatCurrency(Number(price) - 100 - 150, {currency, locales: currentLang})}{' '}
              </Text>
              <Text>
                {t('goldCard.shippingFee')} {formatCurrency(100, {currency, locales: currentLang})}
              </Text>
              <Text>
                {t('goldCard.cardFee')} {formatCurrency(150, {currency, locales: currentLang})}
              </Text>
            </View>
          </View>
        )}

        <View style={[styles.bottomGrid, {marginTop: 20}]}>
          <PaymentIcon height={20} width={20} />
          <Text style={styles.text}>
            {t('goldCard.paymentMethod')} {t('bankTransfer.orders.method')}
          </Text>
        </View>
        <Button
          loading={isLoading}
          title={t('bankTransfer.orders.btn')}
          containerStyle={{marginTop: 20, marginBottom: 20}}
          onPress={() => mutate({id: id, asset: currency})}
          disabled={isDisabled}
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
  radioButtonContainer: {
    marginTop: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
  },
  checkbox: {
    color: colors.tertiary,
  },
  checkBoxContainer: {
    justifyContent: 'center',
    padding: 0,
    paddingLeft: 10,
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
