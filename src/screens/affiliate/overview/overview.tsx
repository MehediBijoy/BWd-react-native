import React from 'react'
import {View} from 'react-native'
import {useQuery} from '@tanstack/react-query'
import {Button, Text, makeStyles} from '@rneui/themed'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import CopyButton from '@core/CopyButton'
import Loader from '@core/Loader'

import {cacheKey} from 'api'
import {useApi} from 'hooks/api'
import {useProfile} from 'hooks/helper'
import {makeReferralLink} from 'utils'
import {RouteStack} from 'navigators/routes'

import PayoutModal from './payoutModal/payoutModal'

type ReferralBoxProps = {
  label: string
  price?: string
  isLoading: boolean
}

type OverviewProps = {
  navigation: NativeStackScreenProps<RouteStack, 'Affiliates'>['navigation']
}

const ReferralBox = ({label, price, isLoading}: ReferralBoxProps) => {
  const styles = useStyles()
  return (
    <View style={[styles.referralBoxOverview, styles.container]}>
      <Text style={styles.referralLabel}>{label}</Text>
      {isLoading ? <Loader /> : <Text style={styles.priceLabel}>{price} BWG</Text>}
    </View>
  )
}

const Overview = ({navigation}: OverviewProps) => {
  const api = useApi()
  const styles = useStyles()
  const {profile} = useProfile()

  const [isOpened, setIsOpened] = React.useState<boolean>(false)

  const {
    data: commissionData,
    isLoading,
    refetch: refetchPayoutCommissions,
  } = useQuery({
    queryKey: [cacheKey.affiliateCommission, profile?.id],
    queryFn: () => api.getUserAffiliateCommission(profile?.id as number),
  })

  return (
    <View style={styles.container}>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>Total commission over lifetime: </Text>
        {isLoading ? (
          <Loader />
        ) : (
          <Text style={styles.label}>{commissionData?.total_income} BWG</Text>
        )}
      </View>
      <View style={[styles.referralBox, styles.boxWrapper]}>
        <Text style={styles.label}>Referral ID:</Text>
        <Text style={styles.label}>{profile?.referral_token}</Text>
      </View>
      <View style={[styles.referralBox]}>
        <Text style={styles.label}>Copy Link:</Text>
        {profile?.referral_token && (
          <CopyButton toCopy={makeReferralLink(profile?.referral_token)} />
        )}
      </View>

      <ReferralBox
        label='Total direct commission'
        price={commissionData?.total_direct}
        isLoading={isLoading}
      />
      <ReferralBox
        label='Total unilevel commission'
        price={commissionData?.total_unilevel}
        isLoading={isLoading}
      />
      <ReferralBox
        label='Total Payout commission'
        price={commissionData?.total_payout}
        isLoading={isLoading}
      />
      <ReferralBox
        label='Available account commission'
        price={commissionData?.current_balance}
        isLoading={isLoading}
      />

      <View style={styles.payoutButtonWrapper}>
        <Button
          title='Payout commission'
          disabled={Number(commissionData?.current_balance) === 0}
          onPress={() => setIsOpened(true)}
          containerStyle={{maxWidth: '50%'}}
        />
      </View>

      <PayoutModal
        isOpened={isOpened}
        onClose={() => setIsOpened(false)}
        navigation={navigation}
        refetchPayoutCommissions={refetchPayoutCommissions}
      />
    </View>
  )
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    marginTop: 20,
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
    fontSize: 16,
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
  payoutButtonWrapper: {
    marginVertical: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
}))

export default Overview
