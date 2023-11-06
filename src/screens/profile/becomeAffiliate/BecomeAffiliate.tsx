import React from 'react'
import {useTranslation} from 'react-i18next'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {Image, Text, Button, Tooltip, makeStyles} from '@rneui/themed'
import {ActivityIndicator, Linking, ScrollView, TouchableOpacity, View} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import CheckBox from '@core/CheckBox'
import Accordion from '@core/Accordion'
import SafeAreaView from '@core/SafeAreaView'

import {cacheKey} from 'api'
import {useApi} from 'hooks/api'
import {User} from 'api/Response'
import {ErrorObject} from 'api/Errors'
import {useProfile} from 'hooks/helper'
import {RouteStack} from 'navigators/routes'
import affiliateTreeImg from 'images/affiliates/affiliate-tree.png'
import affiliateLevelImg from 'images/affiliates/affiliate-level.png'
import affiliatePoolsImg from 'images/affiliates/affiliate-pools.png'
import affiliateNetworkImg from 'images/affiliates/affiliate-network.png'
import {LegalStuff} from 'constants/legalStuff.config'

import {howItWorks, benefitsConfig, poolConfig} from './accordian.config'

const BecomeAffiliate = ({navigation}: NativeStackScreenProps<RouteStack>) => {
  const api = useApi()
  const {t} = useTranslation()
  const styles = useStyle()
  const {profile, setProfile} = useProfile()

  const client = useQueryClient()
  const [isChecked, SetIsChecked] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(true)
  const [tooltipVisible, setTooltipVisible] = React.useState(false)

  const {mutate: enableAffiliate, isLoading} = useMutation<User, ErrorObject, number>({
    mutationFn: api.enableAffiliate,
    onSuccess: user => {
      client.invalidateQueries([cacheKey.profile, profile?.id])
      setProfile(user)
      navigation.navigate('Settings')
    },
  })

  const handleCheckBox = () => {
    if (isDisabled) {
      setTooltipVisible(true)
      setTimeout(() => setTooltipVisible(false), 2000)
    } else {
      SetIsChecked(!isChecked)
    }
  }

  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView nestedScrollEnabled={true}>
        <View style={[styles.container]}>
          <Text style={styles.title}>{t('convertAffiliate.title1')} </Text>
          <Text style={styles.infoText}>{t('convertAffiliate.text1')}</Text>
          <Image
            source={affiliateNetworkImg}
            style={{width: '100%', height: 200}}
            resizeMode='contain'
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.title}>{t('convertAffiliate.title2')}</Text>
          <Text style={styles.infoText}>{t('convertAffiliate.text2')}</Text>

          <View style={styles.accordionWrapper}>
            <Accordion data={howItWorks(t)} />
          </View>

          <Text style={styles.title}>{t('convertAffiliate.title3')}</Text>
          <Image
            source={affiliateLevelImg}
            style={{width: '100%', height: 300, alignItems: 'center', margin: 0}}
            resizeMode='contain'
            PlaceholderContent={<ActivityIndicator />}
          />

          <Image
            source={affiliateTreeImg}
            style={{width: '100%', height: 300, alignItems: 'center', margin: 0}}
            resizeMode='contain'
            PlaceholderContent={<ActivityIndicator />}
          />

          <Text style={styles.subTitle}>{t('convertAffiliate.example.title1')} :</Text>
          <Text style={styles.infoText}>{t('convertAffiliate.example.line1')}</Text>
          <Text style={styles.infoText}>{t('convertAffiliate.example.line2')}</Text>

          <Text style={[styles.subTitle, {marginTop: 10}]}>
            {t('convertAffiliate.example.title2')} :
          </Text>
          <Text style={styles.infoText}>{t('convertAffiliate.example.line3')}</Text>
          <Text style={styles.infoText}>{t('convertAffiliate.example.line4')}</Text>
          <Text style={styles.infoText}>{t('convertAffiliate.example.line5')}</Text>

          <Text style={styles.title}>{t('convertAffiliate.benefits')}</Text>

          <View style={styles.accordionWrapper}>
            <Accordion data={benefitsConfig(t)} />
          </View>

          <Text style={styles.title}>{t('convertAffiliate.pools')}</Text>
          <Text style={styles.infoText}>{t('convertAffiliate.text3')}</Text>

          <Image
            source={affiliatePoolsImg}
            style={{width: '100%', height: 300, alignItems: 'center', justifyContent: 'center'}}
            resizeMode='contain'
            PlaceholderContent={<ActivityIndicator />}
          />

          <View style={styles.accordionWrapper}>
            <Accordion data={poolConfig(t)} />
          </View>

          <TouchableOpacity activeOpacity={0.8}>
            <Text
              style={styles.link}
              onPress={() => {
                Linking.openURL(LegalStuff.affiliateTerms)
                setIsDisabled(false)
              }}
            >
              {t('convertAffiliate.termsAndConditions')}
            </Text>
          </TouchableOpacity>

          <View>
            <CheckBox
              checked={isChecked}
              label={t('convertAffiliate.agreeTermsAndConditions')}
              onPress={() => handleCheckBox()}
            />

            {tooltipVisible && (
              <Tooltip
                width={320}
                height={60}
                visible
                popover={
                  <Text style={[styles.tooltipText]}>{t('convertAffiliate.needDownload')}</Text>
                }
                onClose={() => setTooltipVisible(false)}
              />
            )}
          </View>

          <Button
            loading={isLoading}
            disabled={!isChecked}
            onPress={() => enableAffiliate(profile?.id as number)}
            title={t('convertAffiliate.convert')}
            color='success'
            containerStyle={{borderRadius: 8, marginTop: 10}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const useStyle = makeStyles(({colors}) => ({
  container: {
    marginVertical: 10,
    marginHorizontal: 10,
    rowGap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  termsConditionText: {
    padding: 10,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    backgroundColor: colors.bgPaper,
  },
  link: {
    color: colors.tertiary,
    fontSize: 16,
    marginVertical: 20,
  },
  accordionWrapper: {
    marginVertical: 10,
  },
  tooltipText: {
    color: colors.textReverse,
  },
}))

export default BecomeAffiliate
