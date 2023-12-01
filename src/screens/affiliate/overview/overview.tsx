import React from 'react'
import {View} from 'react-native'
import {useQuery} from '@tanstack/react-query'
import {useTranslation} from 'react-i18next'
import {Button, Text, makeStyles} from '@rneui/themed'

import Loader from '@core/Loader'

import {cacheKey} from 'api'
import {useApi} from 'hooks/api'
import {useLocales} from 'hooks/states'
import {alpha, formatCurrency} from 'utils'
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

const ReferralBox = ({label, price, isLoading, icon, bgColor}: ReferralBoxProps) => {
  const styles = useStyles()
  return (
    <View style={styles.grid}>
      <View style={styles.box}>
        <Text style={styles.subTitle}>{label}</Text>
        <View style={[styles.imageWrapper, {backgroundColor: bgColor}]}>{icon}</View>
      </View>
      {isLoading ? <Loader /> : <Text style={styles.priceText}>{price}</Text>}
    </View>
  )
}

const Overview = () => {
  const api = useApi()
  const styles = useStyles()
  const {profile} = useProfile()
  const {t} = useTranslation()
  const {currentLang} = useLocales()
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
        label={t('affiliate.overview.fiat')}
        price={
          bwgPrice &&
          formatCurrency(Number(data?.current_balance) * Number(bwgPrice?.price), {
            locales: currentLang,
            maximumFractionDigits: 2,
          })
        }
        isLoading={isLoading || bwgILoading}
      />

      <ReferralBox
        icon={<TotalCommissionImg height={20} width={20} />}
        bgColor='rgba(110, 255, 0, 0.20)'
        label={t('affiliate.lifeTimeCommission')}
        price={
          data &&
          formatCurrency(data.total_income, {
            locales: currentLang,
            currency: 'BWG',
            maximumFractionDigits: 4,
          })
        }
        isLoading={isLoading}
      />

      {isShowAll && (
        <>
          <ReferralBox
            icon={<DirectImg height={20} width={20} />}
            bgColor='rgba(163, 198, 233, 0.2)'
            label={t('affiliate.overview.direct')}
            price={
              data &&
              formatCurrency(data.total_direct, {
                locales: currentLang,
                currency: 'BWG',
                maximumFractionDigits: 4,
              })
            }
            isLoading={isLoading}
          />

          <ReferralBox
            icon={<UnilevelImg height={20} width={20} />}
            bgColor='rgba(21, 193, 170, 0.20)'
            label={t('affiliate.overview.uniLevel')}
            price={
              data &&
              formatCurrency(data.total_unilevel, {
                locales: currentLang,
                currency: 'BWG',
                maximumFractionDigits: 4,
              })
            }
            isLoading={isLoading}
          />

          <ReferralBox
            icon={<PayedOutImg height={20} width={20} />}
            bgColor='rgba(216, 189, 124, 0.20)'
            label={t('affiliate.overview.payedOut')}
            price={
              data &&
              formatCurrency(data.total_payout, {
                locales: currentLang,
                currency: 'BWG',
                maximumFractionDigits: 4,
              })
            }
            isLoading={isLoading}
          />

          <ReferralBox
            icon={<AvailableImg height={20} width={20} />}
            bgColor='rgba(169, 213, 108, 0.20)'
            label={t('affiliate.overview.available')}
            price={
              data &&
              formatCurrency(data.current_balance, {
                locales: currentLang,
                currency: 'BWG',
                maximumFractionDigits: 4,
              })
            }
            isLoading={isLoading}
          />
        </>
      )}

      <Button
        title={isShowAll ? t('affiliate.closeBtn') : t('affiliate.showBtn')}
        onPress={() => setIsShowAll(!isShowAll)}
        containerStyle={{
          marginBottom: 20,
        }}
        buttonStyle={styles.toggleBtn}
      />

      <Button
        title={t('affiliate.payoutCommissionBtn')}
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
}))

export default Overview
