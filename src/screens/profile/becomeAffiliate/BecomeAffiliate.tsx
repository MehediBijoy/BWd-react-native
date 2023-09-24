import React from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {Image, Text, Button, makeStyles} from '@rneui/themed'
import {ActivityIndicator, ScrollView, View} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import CheckBox from '@core/CheckBox'
import Accordion from '@core/Accordion'

import {cacheKey} from 'api'
import {useApi} from 'hooks/api'
import {User} from 'api/Response'
import {ErrorObject} from 'api/Errors'
import {useProfile} from 'hooks/helper'
import affiliateTreeImg from 'images/affiliates/affiliate-tree.png'
import affiliateLevelImg from 'images/affiliates/affiliate-level.png'
import affiliatePoolsImg from 'images/affiliates/affiliate-pools.png'
import affiliateNetworkImg from 'images/affiliates/affiliate-network.png'
import {RouteStack} from 'navigators/routes'

import {howItWorks, benefitsConfig, poolConfig} from './accordian.config'

const BecomeAffiliate = ({navigation}: NativeStackScreenProps<RouteStack>) => {
  const styles = useStyle()
  const api = useApi()
  const {profile, setProfile} = useProfile()

  const client = useQueryClient()
  const [isChecked, SetIsChecked] = React.useState(false)
  const [isDisabled, setIsDisabled] = React.useState(false)

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}: any) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
  }

  const {mutate: enableAffiliate, isLoading} = useMutation<User, ErrorObject, any, any>({
    mutationFn: api.enableAffiliate,
    onSuccess: user => {
      client.invalidateQueries([cacheKey.profile, profile?.id])
      setProfile(user)
      navigation.navigate('Settings')
    },
  })

  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Join Our Affiliate Program and Unlock Your Potential with Bretton Woods AG{' '}
        </Text>
        <Text style={styles.infoText}>
          Are you looking for an exciting opportunity to earn a passive income while enjoying the
          freedom to work on your own terms? Look no further! Join the Bretton Woods AG Affiliate
          Program today and embark on a journey towards financial success. As one of our valued
          affiliates, you`ll gain access to a range of benefits that will help you build a
          rock-solid income stream, backed by the power of gold. Don`t miss out on this chance of a
          lifetime to be one of our pioneering affiliates!
        </Text>
        <Image
          source={affiliateNetworkImg}
          style={{width: '100%', height: 200}}
          resizeMode='contain'
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={styles.title}>How does it work?</Text>
        <Text style={styles.infoText}>
          At the Bretton Woods digital AG, we believe in rewarding our affiliates for their efforts
          in driving the growth of our platform. Our affiliate system is designed to provide you
          with a lucrative opportunity to earn substantial commissions by simply inviting new users
          to join and engage with our BWG Token. Let`s dive into how our affiliate system works and
          how you can benefit:
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
          between 1 - 10% of the CV (commissionable volume) each. The final version of the marketing
          plan will be published in 2024 with all requirements for pool qualification specified.
          Until then the top performers and global leaders are placed in the pools manually by our
          director of sales. For questions please inquire at pa-sales@brettonwoods.ch.
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
        <Text style={styles.title}>Affiliate Terms & Conditions</Text>

        <View style={{marginTop: 10, height: 300}}>
          <ScrollView
            style={styles.termsConditionText}
            nestedScrollEnabled={true}
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                setIsDisabled(true)
              }
            }}
          >
            <Text>
              Ad occaecat laborum reprehenderit velit nulla. Laborum reprehenderit velit, nulla
              ipsum deserunt. Nulla ipsum deserunt cupidatat. Deserunt cupidatat sed laboris. Sed
              laboris deserunt pariatur. Deserunt pariatur do exercitation officia commodo duis. Do,
              exercitation officia commodo duis sed ullamco sunt. Commodo duis sed ullamco sunt.
            </Text>
            <Text>
              Sed ullamco sunt consectetur laborum nostrud. Sunt consectetur laborum, nostrud veniam
              labore qui quis. Ad occaecat laborum reprehenderit velit nulla. Laborum reprehenderit
              velit, nulla ipsum deserunt. Nulla ipsum deserunt cupidatat. Deserunt cupidatat sed
              laboris.
            </Text>
            <Text>
              Sed laboris deserunt pariatur. Deserunt pariatur do exercitation officia commodo duis.
              Do, exercitation officia commodo duis sed ullamco sunt. Commodo duis sed ullamco sunt.
              Sed ullamco sunt consectetur laborum nostrud. Sunt consectetur laborum, nostrud veniam
              labore qui quis.
            </Text>
            <Text>
              Sed laboris deserunt pariatur. Deserunt pariatur do exercitation officia commodo duis.
              Do, exercitation officia commodo duis sed ullamco sunt. Commodo duis sed ullamco sunt.
              Sed ullamco sunt consectetur laborum nostrud. Sunt consectetur laborum, nostrud veniam
              labore qui quis.
            </Text>
            <Text>
              Sed laboris deserunt pariatur. Deserunt pariatur do exercitation officia commodo duis.
              Do, exercitation officia commodo duis sed ullamco sunt. Commodo duis sed ullamco sunt.
              Sed ullamco sunt consectetur laborum nostrud. Sunt consectetur laborum, nostrud veniam
              labore qui quis.
            </Text>
          </ScrollView>
        </View>
        <Text style={{fontSize: 15, marginVertical: 10}}>
          Be one of the first affiliates to secure your place and embark on a journey towards a
          solid passive income. Join us today and let&apos;s unlock your potential together!
        </Text>

        <CheckBox
          checked={isChecked}
          title={
            <View style={{alignItems: 'baseline', alignContent: 'center'}}>
              <Text style={{marginStart: 10, fontSize: 16}}>By signing up you agree to our</Text>
            </View>
          }
          disabled={!isDisabled}
          onPress={() => SetIsChecked(!isChecked)}
        />

        <View style={{flexDirection: 'column', rowGap: 5, marginLeft: 35}}>
          <Text style={styles.link}>
            Whitepaper, Legal Notice, User Agreement, Privacy Statement, Terms & Conditions
          </Text>
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
  },
  accordionWrapper: {
    marginVertical: 10,
  },
}))

export default BecomeAffiliate
