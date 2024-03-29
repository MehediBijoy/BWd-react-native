import React from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Text, makeStyles, Button} from '@rneui/themed'

import PackageSvg from 'images/goldcard/Package.svg'
import PriceImg from 'images/goldcard/Price.svg'
import {GoldCardPackage} from 'api/Response'

import {benefits, packageImages} from './package.config'
import OrderDetailsModal from './OrderDetailsModal/OrderDetailsModal'
import useCurrency from 'hooks/states/useCurrency'
import useLocales from 'hooks/states/useLocales'
import {formatCurrency} from 'utils'

const BenefitComponent = ({packageType}: {packageType: string}) => {
  const benefit = benefits[packageType] || []

  return (
    <View>
      {benefit.map(({icon, title, description}) => (
        <View key={title} style={{marginBottom: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {icon}
            <Text
              style={{
                marginLeft: 10,
                fontWeight: '700',
              }}
            >
              {title}
            </Text>
          </View>
          <View style={{marginLeft: 40}}>
            <Text>{description}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

const Package = ({id, description, title, price_eur, price_usd, package_type}: GoldCardPackage) => {
  const styles = useStyles()
  const {t} = useTranslation()
  const {currency} = useCurrency()
  const {currentLang} = useLocales()
  const [isOpened, setIsOpened] = React.useState(false)

  const packageImage = packageImages[package_type]
  const price = currency == 'USD' ? price_usd : price_eur

  return (
    <View style={styles.container}>
      <View style={{columnGap: 10, marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
        <PackageSvg width={20} height={20} />
        <Text style={{fontSize: 18}}>{title}</Text>
      </View>

      <View style={{marginVertical: 20}}>
        <Text style={{fontSize: 20, fontWeight: '700'}}>{description}</Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <PriceImg width={30} height={30} />
        <Text style={styles.title}>
          Package total price: {formatCurrency(price, {currency, locales: currentLang})}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginLeft: 40,
        }}
      >
        {/* <Text style={{marginTop: 10}}>Package fees: $2500 </Text>
        <Text style={{marginTop: 10}}>Shipping fees: $100</Text>
        <Text style={{marginTop: 10}}>Card fees: $150</Text> */}
      </View>
      <View style={{marginVertical: 10}}>{packageImage}</View>

      <View style={{marginBottom: 10}}>
        <Text style={styles.title}>Get the benefit </Text>
      </View>
      <BenefitComponent packageType={package_type} />

      <Button
        title={'Preorder package'}
        containerStyle={{marginVertical: 15}}
        onPress={() => setIsOpened(true)}
      />
      <Button
        title={'Preorder just the card'}
        // onPress={() => {
        //   setCardPackage('basic')
        //   setIsOpened(true)
        // }}
        color={'#879A9A'}
      />

      <OrderDetailsModal
        isOpened={isOpened}
        id={id}
        price={price}
        onClose={() => setIsOpened(false)}
      />
    </View>
  )
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    marginVertical: 20,
    rowGap: 0,
  },
  cell: {
    flexDirection: 'row',
    marginTop: 20,
  },
  title: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '700',
  },
  subTitle: {
    color: colors.black,
    marginLeft: 40,
  },
}))

export default Package
