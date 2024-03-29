import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Image, makeStyles, Button} from '@rneui/themed'
import LinearGradient from 'react-native-linear-gradient'
import {useQuery} from '@tanstack/react-query'

import SafeAreaView from '@core/SafeAreaView'
import ContainContainer from '@core/ContentContainer'

import CardBannerImg from 'images/goldcard/card-banner.png'
import {cacheKey} from 'api/CacheKey'
import {useApi} from 'hooks/api'
import {GoldCardPackage} from 'api/Response'

import Package from './Package'

const GoldCard = () => {
  const api = useApi()
  const styles = useStyles()
  const [cardPackage, setCardPackage] = React.useState('signature')

  const {data: goldCardPackages} = useQuery<GoldCardPackage[]>({
    queryKey: [cacheKey.goldCardPackage],
    queryFn: api.getGoldCardPackages,
  })

  const selectedPackage = React.useMemo(
    () => goldCardPackages?.find(item => item.package_type === cardPackage),
    [cardPackage, goldCardPackages]
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
              <Image
                source={CardBannerImg}
                style={{width: 300, height: 200, marginTop: 25}}
                resizeMode='center'
              />
              <View style={{alignItems: 'center', marginHorizontal: 20}}>
                <Text style={styles.title}>Enjoy our BWG gold card</Text>
                <Text style={styles.subTitle}>
                  Spend your gold in real-time anywhere Mastercard is accepted.
                </Text>
              </View>
            </View>
          </LinearGradient>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              gap: 10,
            }}
          >
            {goldCardPackages?.map(({title, package_type}: GoldCardPackage) => {
              // Check if the package is active and not basic
              // if (is_active && package_type !== 'basic') {
              if (package_type !== 'basic') {
                return (
                  <Button
                    title={title}
                    key={package_type}
                    onPress={() => setCardPackage(package_type)}
                    containerStyle={{flex: 1}}
                    titleStyle={
                      package_type === cardPackage
                        ? {fontSize: 12, textTransform: 'capitalize'}
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
          {selectedPackage && <Package {...selectedPackage} />}
        </ContainContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    color: colors.textReverse,
    marginBottom: 15,
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 16,
    color: '#576D71',
    marginBottom: 15,
    textAlign: 'center',
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
}))

export default GoldCard
