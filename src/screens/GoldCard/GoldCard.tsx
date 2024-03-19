import React from 'react'
import {ScrollView, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Text, Image, makeStyles, Button} from '@rneui/themed'
import LinearGradient from 'react-native-linear-gradient'

import SafeAreaView from '@core/SafeAreaView'
import ContainContainer from '@core/ContentContainer'

import CountryImg from 'images/survey/Graphics_4.png'
import EvaluateImg from 'images/survey/Graphics_3.png'
import AvailableImg from 'images/survey/Available.svg'
import TopBannerImg from 'images/survey/Graphics_1.png'
import ExperienceImg from 'images/survey/Graphics_2.png'

import CountryModal from './CountryModal'

const GoldCard = () => {
  const styles = useStyles()
  const {t} = useTranslation()
  const [isOpened, setIsOpened] = React.useState(false)

  return (
    <SafeAreaView>
      <ScrollView>
        <ContainContainer>
          <LinearGradient
            colors={['rgba(18, 90, 79, 0.10)', 'rgba(8, 40, 36, 0.56)']}
            style={{marginTop: 15, borderRadius: 8}}
            // start={{x: 0, y: 0}}
            // end={{x: 1, y: 0}}
          >
            <View style={{alignItems: 'center'}}>
              <Image
                source={TopBannerImg}
                style={{width: 215, height: 150, marginTop: 25}}
                resizeMode='center'
              />
              <Text style={styles.title}>{t('survey.goldCard.title')}</Text>
            </View>
          </LinearGradient>

          <View style={styles.container}>
            <Text style={styles.subTitle}>{t('survey.goldCard.experience')}</Text>
            <Image
              source={ExperienceImg}
              style={{width: '100%', height: 200}}
              resizeMode='contain'
            />
          </View>

          <View style={{marginTop: -10}}>
            <Text style={styles.subTitle}>{t('survey.goldCard.evaluate')}</Text>
            <Image source={EvaluateImg} style={{width: '100%', height: 200}} resizeMode='contain' />
          </View>

          <View style={{marginTop: -10}}>
            <Text style={styles.subTitle}>{t('survey.goldCard.countries')}</Text>
            <Image source={CountryImg} style={{width: '100%', height: 200}} resizeMode='contain' />

            <View
              style={{columnGap: 10, marginTop: 10, flexDirection: 'row', alignItems: 'center'}}
            >
              <AvailableImg width={30} height={30} />
              <Text>{t('survey.goldCard.availableCountry')}</Text>
            </View>
            <Button
              containerStyle={{marginTop: 20, marginBottom: 50}}
              title={t('survey.goldCard.seeBtn')}
            />
          </View>
        </ContainContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    marginVertical: 20,
  },
  interest: {
    marginTop: 20,
    borderRadius: 7,
    paddingVertical: 20,
    paddingHorizontal: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  interestTitle: {
    fontSize: 18,
    color: colors.textReverse,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    color: colors.textReverse,
    marginBottom: 15,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 15,
  },
}))

export default GoldCard
