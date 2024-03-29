import {Button, CheckBox, Text, makeStyles} from '@rneui/themed'
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
import {formatCurrency} from 'utils'
import {useApi} from 'hooks/api'
import {Payment} from 'api/Response'
import {AllCurrencyType} from 'constants/currency.config'
import {GoldCardProps} from 'api/Request'

type OrderDetailsModalProps = {
  isOpened: boolean
  id: number
  price: string
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

const OrderDetailsModal = ({isOpened, id, price, onClose}: OrderDetailsModalProps) => {
  const {t} = useTranslation()
  const api = useApi()
  const styles = useStyles()
  const [cardType, setCardType] = React.useState(0)
  const {currency} = useCurrency()
  const {currentLang} = useLocales()
  const navigation = useNavigation<NavigationProp<PaymentParamsList, 'PaymentInformation'>>()

  const {mutate, isLoading} = useMutation<Payment, unknown, GoldCardProps>({
    mutationFn: api.goldCardPurchase,
    onSuccess: data => {
      navigation.navigate('PaymentInformation', {
        paymentData: data,
        currency: currency,
      })
    },
    onError: error => {
      // console.log(error.message)
    },
  })

  return (
    <SafeAreaView>
      <Modal title='Order Details' isOpened={isOpened} onClose={onClose}>
        <Text style={styles.title}>Package Details</Text>
        <View style={{columnGap: 10, marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
          <PackageSvg width={20} height={20} />
          <Text style={styles.text}>Package Name: Premium Package</Text>
        </View>

        <Text style={[styles.title, {marginTop: 20}]}>Card Type</Text>
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

        <View
          style={{columnGap: 10, marginTop: 20, flexDirection: 'row', alignItems: 'flex-start'}}
        >
          <FeeSvg width={30} height={30} />
          <Text style={styles.text}>
            Package total price: {formatCurrency(price, {currency, locales: currentLang})}
          </Text>
        </View>
        {cardType === 1 && (
          <View style={styles.feeDetails}>
            <View style={styles.feeDetailsBar}></View>
            <View style={{gap: 10}}>
              <Text>Package fees: $2500 </Text>
              <Text>Shipping fees: $100</Text>
              <Text>Card fees: $150</Text>
            </View>
          </View>
        )}

        <View style={[styles.bottomGrid, {marginTop: 20}]}>
          <PaymentIcon height={20} width={20} />
          <Text style={styles.text}>Payment Method: {t('bankTransfer.orders.method')}</Text>
        </View>

        <Button
          loading={isLoading}
          title={t('bankTransfer.orders.btn')}
          containerStyle={{marginTop: 20, marginBottom: 20}}
          onPress={() => mutate({id: id, asset: currency})}
        />
      </Modal>
    </SafeAreaView>
  )
}

const useStyles = makeStyles(({colors}) => ({
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
}))

export default OrderDetailsModal
