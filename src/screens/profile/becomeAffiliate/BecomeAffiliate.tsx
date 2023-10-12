import React from 'react'
import {Image, Text, Button, Tooltip, makeStyles} from '@rneui/themed'
import {ActivityIndicator, Linking, ScrollView, TouchableOpacity, View} from 'react-native'
import {useMutation, useQueryClient} from '@tanstack/react-query'
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
  const styles = useStyle()
  const api = useApi()
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
          <Text style={styles.title}>
            Join Our Affiliate Program and Unlock Your Potential with Bretton Woods AG{' '}
          </Text>
          <Text style={styles.infoText}>
            Are you looking for an exciting opportunity to earn a passive income while enjoying the
            freedom to work on your own terms? Look no further! Join the Bretton Woods AG Affiliate
            Program today and embark on a journey towards financial success. As one of our valued
            affiliates, you`ll gain access to a range of benefits that will help you build a
            rock-solid income stream, backed by the power of gold. Don`t miss out on this chance of
            a lifetime to be one of our pioneering affiliates!
          </Text>
          <Image
            source={affiliateNetworkImg}
            style={{width: '100%', height: 200}}
            resizeMode='contain'
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.title}>How does it work?</Text>
          <Text style={styles.infoText}>
            At the Bretton Woods digital AG, we believe in rewarding our affiliates for their
            efforts in driving the growth of our platform. Our affiliate system is designed to
            provide you with a lucrative opportunity to earn substantial commissions by simply
            inviting new users to join and engage with our BWG Token. Let`s dive into how our
            affiliate system works and how you can benefit:
          </Text>

          <View style={styles.accordionWrapper}>
            <Accordion data={howItWorks} />
          </View>

          <Text style={styles.title}>Commission System</Text>
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

          <Text style={styles.subTitle}>Example :</Text>
          <Text style={styles.infoText}>A Sale of 1000$ with 20% Fees = 200$ Fees</Text>
          <Text style={styles.infoText}>10% of Fees goes to Affiliates CV* = 20$</Text>

          <Text style={[styles.subTitle, {marginTop: 10}]}>Affiliates CV :</Text>
          <Text style={styles.infoText}>20% of CV is Direct-Commission = 4$</Text>
          <Text style={styles.infoText}>36% of CV is Uni-Level Commission = 7,20$</Text>
          <Text style={styles.infoText}>44% of CV is divided into the pools = 8,80$</Text>

          <Text style={styles.title}>Benefits</Text>

          <View style={styles.accordionWrapper}>
            <Accordion data={benefitsConfig} />
          </View>

          <Text style={styles.title}>Pools</Text>
          <Text style={styles.infoText}>
            In the affiliate system there are several pools. The dynamic compression pool that
            collects left over unilevel or unclaimed direct commission and regular pools that get
            between 1 - 10% of the CV (commissionable volume) each. The final version of the
            marketing plan will be published in 2024 with all requirements for pool qualification
            specified. Until then the top performers and global leaders are placed in the pools
            manually by our president of sales and marketing. For questions please inquire at
            pa-sales@brettonwoods.ch.
          </Text>

          <Image
            source={affiliatePoolsImg}
            style={{width: '100%', height: 300, alignItems: 'center', justifyContent: 'center'}}
            resizeMode='contain'
            PlaceholderContent={<ActivityIndicator />}
          />

          <View style={styles.accordionWrapper}>
            <Accordion data={poolConfig} />
          </View>

          <TouchableOpacity activeOpacity={0.8}>
            <Text
              style={styles.link}
              onPress={() => {
                Linking.openURL(LegalStuff.affiliateTerms)
                setIsDisabled(false)
              }}
            >
              Download Affiliate Terms & Conditions
            </Text>
          </TouchableOpacity>

          <View>
            <CheckBox
              checked={isChecked}
              label='Agree with affiliate Terms & Conditions'
              onPress={() => handleCheckBox()}
            />

            {tooltipVisible && (
              <Tooltip
                width={320}
                height={60}
                visible
                popover={
                  <Text style={[styles.tooltipText]}>
                    You need to download and read the affiliate Terms & Conditions before agreeing
                  </Text>
                }
                onClose={() => setTooltipVisible(false)}
              />
            )}
          </View>

          <Button
            loading={isLoading}
            disabled={!isChecked}
            onPress={() => enableAffiliate(profile?.id as number)}
            title='Convert your account'
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
