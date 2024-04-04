import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Image, makeStyles, Button} from '@rneui/themed'
import LinearGradient from 'react-native-linear-gradient'
import {useQuery} from '@tanstack/react-query'
import {useTranslation} from 'react-i18next'

import SafeAreaView from '@core/SafeAreaView'
import ContainContainer from '@core/ContentContainer'

import {useApi} from 'hooks/api'
import {cacheKey} from 'api/CacheKey'
import {useProfile} from 'hooks/helper'
import {GoldCardPackage} from 'api/Response'
import useCurrency from 'hooks/states/useCurrency'
import CardBannerImg from 'images/goldcard/card-banner.png'

import Package from './Package'
import {IsCountryWhiteList} from './package.config'
import CountryBlockModal from './CountryModal/CountryBlockModal'
import OrderDetailsModal from './OrderDetailsModal/OrderDetailsModal'

const GoldCard = () => {
  const api = useApi()
  const styles = useStyles()
  const {t} = useTranslation()
  const {currency} = useCurrency()
  const [cardPackage, setCardPackage] = React.useState('signature')
  const [isShowCountryModal, setShowCountryModal] = React.useState(false)
  const [isPurchaseDisabled, setPurchaseDisabled] = React.useState(false)
  const [isShowDetailModal, setShowDetailModal] = React.useState(false)

  const {data: goldCardPackages} = useQuery<GoldCardPackage[]>({
    queryKey: [cacheKey.goldCardPackage],
    queryFn: api.getGoldCardPackages,
  })

  const profileData = useProfile()
  const id = profileData?.profile?.id as number

  const {data: profile, isLoading} = useQuery({
    queryKey: [cacheKey.userDetails, id],
    queryFn: () => api.getUserInfo(id),
    enabled: !!id,
  })

  const {data} = useQuery({
    queryKey: [cacheKey.surveyStatus, profile?.id],
    queryFn: () =>
      api.checkSurveyStatus({id: profile?.id as number, event: 'exclude_country_user'}),
    enabled: !!profile?.id,
  })

  React.useMemo(() => {
    if (profile) {
      setShowCountryModal(IsCountryWhiteList(profile?.user_detail?.address_country))
      setPurchaseDisabled(IsCountryWhiteList(profile?.user_detail?.address_country))
    }
  }, [profile])

  const selectedPackage = React.useMemo(
    () => goldCardPackages?.find(item => item.package_type === cardPackage),
    [cardPackage, goldCardPackages]
  )

  const basicPackage = React.useMemo(
    () => goldCardPackages?.find(item => item.package_type === 'basic'),
    [goldCardPackages]
  )

  return (
    <SafeAreaView>
      <ScrollView>
        <ContainContainer>
          <LinearGradient
            colors={['rgba(18, 90, 79, 0.10)', 'rgba(8, 40, 36, 0.56)']}
            style={{marginTop: 15, borderRadius: 8}}
          >
            <View style={{alignItems: 'center'}}>
              <Image source={CardBannerImg} style={styles.bannerImage} resizeMode='center' />
              <View style={{alignItems: 'center', marginHorizontal: 20}}>
                <Text style={styles.title}>{t('goldCard.bannerTitle')}</Text>
                <Text style={styles.subTitle}>{t('goldCard.bannerSubTitle')}</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.buttonView}>
            {goldCardPackages?.map(({title, package_type}: GoldCardPackage) => {
              if (package_type !== 'basic') {
                return (
                  <Button
                    title={title}
                    key={t(`goldCard.packageType.${package_type}`)}
                    onPress={() => setCardPackage(package_type)}
                    containerStyle={{flex: 1}}
                    titleStyle={
                      package_type === cardPackage
                        ? styles.buttonActiveTitleStyle
                        : styles.buttonTitleStyle
                    }
                    buttonStyle={
                      package_type === cardPackage ? styles.buttonActiveStyle : styles.buttonStyle
                    }
                    type={package_type === cardPackage ? 'solid' : 'outline'}
                  />
                )
              } else {
                return null
              }
            })}
          </View>
          {selectedPackage && <Package {...selectedPackage} isDisabled={isPurchaseDisabled} />}

          <Button
            title={t('goldCard.preOrderCard')}
            color={'#879A9A'}
            onPress={() => setShowDetailModal(true)}
            containerStyle={{marginBottom: 20}}
          />

          {basicPackage && (
            <OrderDetailsModal
              isOpened={isShowDetailModal}
              isDisabled={isPurchaseDisabled}
              id={basicPackage.id}
              physicalPrice={currency == 'USD' ? basicPackage.price_usd : basicPackage.price_eur}
              virtualPrice={
                currency == 'USD' ? basicPackage.virtual_price_usd : basicPackage.virtual_price_eur
              }
              package_type={basicPackage.package_type}
              onClose={() => setShowDetailModal(false)}
            />
          )}
          {!isLoading && data?.status !== 'FILLED' && (
            <CountryBlockModal
              id={profile?.id as number}
              name={profile?.user_detail?.first_name as string}
              isOpened={isShowCountryModal}
              onClose={() => setShowCountryModal(false)}
            />
          )}
        </ContainContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    marginVertical: 20,
  },
  bannerImage: {
    width: 300,
    height: 200,
    marginTop: 25,
  },
  title: {
    fontSize: 24,
    color: colors.textReverse,
    marginBottom: 15,
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 16,
    color: '#4C5759',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '800',
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  buttonStyle: {
    borderRadius: 7,
    borderColor: '#576D71',
    border: 3,
  },
  buttonActiveStyle: {
    borderRadius: 7,
  },
  buttonTitleStyle: {
    color: '#576D71',
    textTransform: 'capitalize',
    fontSize: 12,
  },
  buttonActiveTitleStyle: {
    textTransform: 'capitalize',
    fontSize: 12,
  },
}))

export default GoldCard
