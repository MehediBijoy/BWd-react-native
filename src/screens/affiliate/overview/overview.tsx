import React from 'react'
import {View} from 'react-native'
import {useQuery} from '@tanstack/react-query'
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutUp,
  Layout,
  RollInLeft,
  RollInRight,
  RollOutRight,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutDown,
  SlideOutRight,
  StretchOutY,
  ZoomInUp,
  ZoomOut,
} from 'react-native-reanimated'
import {Button, Text, makeStyles} from '@rneui/themed'

import Loader from '@core/Loader'

import {cacheKey} from 'api'
import {useApi} from 'hooks/api'
import {alpha} from 'utils'
import {useAssets, useProfile} from 'hooks/helper'
import FiatImg from 'images/affiliates/fiat.svg'
import TotalCommissionImg from 'images/affiliates/total_commission_lifetime.svg'
import DirectImg from 'images/affiliates/direct_commission.svg'
import UnilevelImg from 'images/affiliates/unilevel_commission.svg'
import PayedOutImg from 'images/affiliates/available.svg'
import AvailableImg from 'images/affiliates/payedOut.svg'

import PayoutModal from './payoutModal'

type ReferralBoxProps = {
  label: string
  price?: string | number
  isLoading: boolean
  fiat?: boolean
  bgColor: string
  icon: React.ReactNode
}

const ReferralBox = ({label, price, isLoading, fiat, icon, bgColor}: ReferralBoxProps) => {
  const styles = useStyles()
  return (
    <View style={styles.grid}>
      <View style={styles.box}>
        <Text style={styles.subTitle}>{label}</Text>
        <View style={[styles.imageWrapper, {backgroundColor: bgColor}]}>{icon}</View>
      </View>
      {isLoading ? (
        <Loader />
      ) : (
        <Text style={styles.priceText}>{fiat ? `$${price}` : `${price} BWG`}</Text>
      )}
    </View>
  )
}

const Overview = () => {
  const api = useApi()
  const styles = useStyles()
  const {profile} = useProfile()
  const {data: bwgPrice, isLoading: bwgILoading} = useAssets('BWG')
  const [isShowAll, setIsShowAll] = React.useState(false)

  const [isOpened, setIsOpened] = React.useState<boolean>(false)

  const {data, isLoading, refetch} = useQuery({
    queryKey: [cacheKey.affiliateCommission, profile?.id],
    queryFn: () => api.getUserAffiliateCommission(profile?.id as number),
  })

  return (
    <View style={styles.container}>
      <ReferralBox
        icon={<FiatImg height={20} width={20} />}
        bgColor='rgba(229, 80, 80, 0.20)'
        label='Available commission in fiat'
        price={bwgPrice && (Number(data?.current_balance) * Number(bwgPrice?.price)).toFixed(4)}
        isLoading={isLoading || bwgILoading}
        fiat
      />

      <ReferralBox
        icon={<TotalCommissionImg height={20} width={20} />}
        bgColor='rgba(110, 255, 0, 0.20)'
        label='Total commission over lifetime'
        price={data?.total_income}
        isLoading={isLoading}
      />

      {isShowAll && (
        <Animated.View layout={Layout.stiffness(0)} entering={FadeInUp} exiting={StretchOutY}>
          {/* <Animated.View layout={Layout.stiffness(0)} entering={FadeInUp} exiting={ZoomOut}> */}
          <ReferralBox
            icon={<DirectImg height={20} width={20} />}
            bgColor='rgba(163, 198, 233, 0.2)'
            label='Total direct commission'
            price={data?.total_direct}
            isLoading={isLoading}
          />
          {/* </Animated.View> */}

          {/* <Animated.View layout={Layout.stiffness(0)} entering={FadeInUp} exiting={ZoomOut}> */}
          <ReferralBox
            icon={<UnilevelImg height={20} width={20} />}
            bgColor='rgba(21, 193, 170, 0.20)'
            label='Total unilevel commission'
            price={data?.total_unilevel}
            isLoading={isLoading}
          />
          {/* </Animated.View> */}
          {/* <Animated.View layout={Layout.stiffness(0)} entering={FadeInUp} exiting={ZoomOut}> */}
          <ReferralBox
            icon={<PayedOutImg height={20} width={20} />}
            bgColor='rgba(216, 189, 124, 0.20)'
            label='Total commission payed out'
            price={data?.total_payout}
            isLoading={isLoading}
          />
          {/* </Animated.View> */}
          {/* <Animated.View layout={Layout.stiffness(0)} entering={FadeInUp} exiting={ZoomOut}> */}
          <ReferralBox
            icon={<AvailableImg height={20} width={20} />}
            bgColor='rgba(169, 213, 108, 0.20)'
            label='Available account commission'
            price={data?.current_balance}
            isLoading={isLoading}
          />
          {/* </Animated.View> */}
        </Animated.View>
      )}

      <Button
        title={isShowAll ? 'Close' : 'Show all'}
        onPress={() => setIsShowAll(!isShowAll)}
        containerStyle={{
          marginBottom: 20,
        }}
        buttonStyle={styles.toggleBtn}
      />

      <Button
        title='Payout commission'
        disabled={Number(data?.current_balance) === 0}
        onPress={() => setIsOpened(true)}
        containerStyle={{
          marginBottom: 20,
        }}
        buttonStyle={{
          height: 50,
        }}
      />

      <PayoutModal
        isOpened={isOpened}
        onClose={() => setIsOpened(false)}
        refetchPayoutCommissions={refetch}
      />
    </View>
  )
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    marginTop: 20,
  },
  grid: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 10,
    minHeight: 110,

    //for iOS app
    shadowColor: colors.black,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 3,
    shadowOpacity: 0.25,

    // for android
    elevation: 5,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: colors.textGray,
    fontSize: 16,
  },
  priceText: {
    fontWeight: 'bold',
    color: colors.secondary,
    fontSize: 24,
  },
  toggleBtn: {
    backgroundColor: alpha(colors.grey3, 0.9),
  },
  boxWrapper: {
    marginTop: 10,
  },
  referralBox: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: '700',
    color: colors.secondary,
    fontSize: 20,
  },
  referralLink: {
    marginTop: 3,
    fontWeight: 'bold',
  },
  referralBoxOverview: {
    backgroundColor: colors.secondary,
    width: '100%',
    borderRadius: 6,
    rowGap: 7,
    paddingVertical: 15,
  },
  referralLabel: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.textReverse,
    textAlign: 'center',
  },
  priceLabel: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.textReverse,
    textAlign: 'center',
  },
}))

export default Overview
