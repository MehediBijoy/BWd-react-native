import React from 'react'
import {useTranslation} from 'react-i18next'
import {useQuery} from '@tanstack/react-query'
import {useNavigation} from '@react-navigation/native'
import {DrawerNavigationProp} from '@react-navigation/drawer'
import {makeStyles, Button, Text} from '@rneui/themed'
import {ScrollView, View} from 'react-native'

import SafeAreaView from '@core/SafeAreaView'
import ContentContainer from '@core/ContentContainer'
import {Table} from '@core/Table'

import {useApi} from 'hooks/api'
import {cacheKey} from 'api/CacheKey'
import {useLocales} from 'hooks/states'
import {useProfile} from 'hooks/helper'
import {ReferralStats} from 'api/Response'
import {RouteStack} from 'navigators/routes'
import {formatReferralStats} from 'utils/response'

import ReferralUserModal from '../referralTable/ReferralUserModal'

const DownLineTable = () => {
  const api = useApi()
  const styles = useStyles()
  const {t} = useTranslation()
  const {profile} = useProfile()
  const {currentLang} = useLocales()
  const navigation = useNavigation<DrawerNavigationProp<RouteStack, 'Affiliates'>>()

  const [affiliateID, setAffiliateID] = React.useState(profile?.id)
  const [selectedItem, setSelectedItem] = React.useState<ReferralStats>()

  const {data: referralStats, isLoading} = useQuery({
    queryKey: [cacheKey.affiliateStats, affiliateID, profile?.id],
    queryFn: () =>
      api
        .getReferralStats(affiliateID as number)
        .then(result => formatReferralStats(result, currentLang, t)),
  })

  const loadDownlineUser = (item: ReferralStats) => {
    setAffiliateID(item.referral_id)
  }

  const config = [
    {
      fields: ['commissionAmount', 'referralAccount', 'referralName', 'referralEmail'],
      cellStyle: styles.cellDetails,
      textStyle: [styles.titleText],
    },
    {
      fields: ['referral_status'],
      types: ['badge'],
      cellStyle: styles.cellStatus,
    },
    {
      fields: ['view'],
      cellStyle: styles.cellDate,
      dependency: ['view'],
      types: ['button'],
      onPress: (param: ReferralStats) => loadDownlineUser(param),
    },
  ]

  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView>
        <ContentContainer>
          {!isLoading && (
            <Text h4 h4Style={{marginTop: 20}}>
              {referralStats?.referrer_name} {t('affiliate.referrals')}
            </Text>
          )}
          <Table
            containerStyle={styles.container}
            config={config}
            data={referralStats?.referrals_stats}
            isLoading={isLoading}
            localKeyPrefix={'affiliate.downlineTable.table'}
            onPress={param => setSelectedItem(param)}
          />
          {affiliateID === profile?.id ? (
            <Button
              loading={isLoading}
              title={t('affiliate.overViewBtn')}
              containerStyle={{marginTop: 20, marginBottom: 20}}
              onPress={() => navigation.navigate('Affiliates')}
            />
          ) : (
            <Button
              loading={isLoading}
              title={t('affiliate.backToUserBtn')}
              onPress={() => setAffiliateID(referralStats?.previous_referrer_id as number)}
              containerStyle={{marginTop: 20, marginBottom: 20}}
            />
          )}
          {selectedItem && (
            <ReferralUserModal
              isOpened
              onClose={() => setSelectedItem(undefined)}
              data={selectedItem}
            />
          )}
        </ContentContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DownLineTable

const useStyles = makeStyles(({colors}) => ({
  container: {
    backgroundColor: colors.background,
    marginVertical: 10,
  },
  cellDate: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 12,
    width: '20%',
    color: colors.textPrimary,
  },
  cellDetails: {
    textAlign: 'left',
    width: '55%',
    color: colors.textPrimary,
  },
  cellStatus: {
    textAlign: 'left',
    alignItems: 'flex-start',
    width: '25%',
    fontSize: 12,
    color: colors.textPrimary,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.tertiary,
    textTransform: 'capitalize',
  },
}))
