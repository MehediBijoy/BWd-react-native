import React from 'react'
import {View} from 'react-native'
import {useQuery} from '@tanstack/react-query'
import {Button, Text, makeStyles} from '@rneui/themed'

import CopyButton from '@core/CopyButton'
import Loader from '@core/Loader'

import {cacheKey} from 'api'
import {useApi} from 'hooks/api'
import {useProfile} from 'hooks/helper'
import {makeReferralLink} from 'utils'

import PayoutModal from './payoutModal'

type ReferralBoxProps = {
  label: string
  price?: string
  isLoading: boolean
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

const Overview = () => {
  const api = useApi()
  const styles = useStyles()
  const {profile} = useProfile()

  const [isOpened, setIsOpened] = React.useState<boolean>(false)

  const {data, isLoading, refetch} = useQuery({
    queryKey: [cacheKey.affiliateCommission, profile?.id],
    queryFn: () => api.getUserAffiliateCommission(profile?.id as number),
  })

  return (
    <View style={styles.container}>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>Total commission over lifetime: </Text>
        {isLoading ? <Loader /> : <Text style={styles.label}>{data?.total_income} BWG</Text>}
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
        price={data?.total_direct}
        isLoading={isLoading}
      />
      <ReferralBox
        label='Total unilevel commission'
        price={data?.total_unilevel}
        isLoading={isLoading}
      />
      <ReferralBox
        label='Total Payout commission'
        price={data?.total_payout}
        isLoading={isLoading}
      />
      <ReferralBox
        label='Available account commission'
        price={data?.current_balance}
        isLoading={isLoading}
      />

      <Button
        title='Payout commission'
        disabled={Number(data?.current_balance) === 0}
        onPress={() => setIsOpened(true)}
        containerStyle={{
          marginVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
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
}))

export default Overview
