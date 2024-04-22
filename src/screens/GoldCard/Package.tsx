import React from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Text, makeStyles, Button} from '@rneui/themed'

import PackageSvg from 'images/goldcard/Package.svg'
import PriceImg from 'images/goldcard/Price.svg'
import {GoldCardPackage} from 'api/Response'
import useCurrency from 'hooks/states/useCurrency'
import useLocales from 'hooks/states/useLocales'
import {formatCurrency} from 'utils'

import OrderDetailsModal from './OrderDetailsModal/OrderDetailsModal'
import {benefits, packageImages} from './package.config'

const BenefitComponent = ({packageType}: {packageType: string}) => {
  const {t} = useTranslation()
  const benefit = benefits(t)

  return (
    <View>
      {benefit[packageType].map(({icon, title, description}) => (
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

type PackageProps = {
  isDisabled: boolean
} & GoldCardPackage

const Package = (props: PackageProps) => {
  const styles = useStyles()
  const {t} = useTranslation()
  const {currency} = useCurrency()
  const {currentLang} = useLocales()
  const [isOpened, setIsOpened] = React.useState(false)

  const package_type = props.package_type
  const packageImage = packageImages[package_type]
  const virtualPrice = currency == 'USD' ? props.virtual_price_usd : props.virtual_price_eur

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <PackageSvg width={20} height={20} />
        <Text style={{fontSize: 18}}>{t(`goldCard.packageTitle.${package_type}`)}</Text>
      </View>

      <View style={{marginVertical: 20}}>
        <Text style={{fontSize: 20, fontWeight: '700'}}>
          {t(`goldCard.packageDescription.${package_type}`)}
        </Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        <PriceImg width={30} height={30} />
        <Text style={styles.title}>
          {t('goldCard.packagePrice')}{' '}
          {formatCurrency(virtualPrice, {currency, locales: currentLang})}
        </Text>
      </View>

      <View style={{marginVertical: 10}}>{packageImage}</View>

      <View style={{marginBottom: 10}}>
        <Text style={styles.title}>{t('goldCard.getBenefit')} </Text>
      </View>
      <BenefitComponent packageType={package_type} />

      <Button
        title={t('goldCard.preOrderPackage')}
        containerStyle={{marginTop: 15}}
        onPress={() => setIsOpened(true)}
      />

      <OrderDetailsModal isOpened={isOpened} {...props} onClose={() => setIsOpened(false)} />
    </View>
  )
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    marginVertical: 20,
    rowGap: 0,
  },
  titleView: {
    columnGap: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
