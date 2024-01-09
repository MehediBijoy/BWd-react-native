import React from 'react'
import {useTranslation} from 'react-i18next'
import {useQuery} from '@tanstack/react-query'
import {useNavigation} from '@react-navigation/native'
import {DrawerNavigationProp} from '@react-navigation/drawer'
import {Text, useTheme, makeStyles, Button} from '@rneui/themed'
import {ActivityIndicator, View, TouchableOpacity, ScrollView} from 'react-native'

import Loader from '@core/Loader'
import StatusBadge from '@core/StatusBadge'
import SafeAreaView from '@core/SafeAreaView'
import ContentContainer from '@core/ContentContainer'

import {useApi} from 'hooks/api'
import {cacheKey} from 'api/CacheKey'
import {useLocales} from 'hooks/states'
import {useProfile} from 'hooks/helper'
import {ReferralStats} from 'api/Response'
import {formatNumber, shorten} from 'utils'
import {RouteStack} from 'navigators/routes'

import ReferralUserModal from '../referralTable/ReferralUserModal'

const DownLineTable = () => {
  const api = useApi()
  const styles = useStyles()
  const {theme} = useTheme()
  const {t} = useTranslation()
  const {profile} = useProfile()
  const {currentLang} = useLocales()
  const navigation = useNavigation<DrawerNavigationProp<RouteStack, 'Affiliates'>>()

  const [affiliateID, setAffiliateID] = React.useState(profile?.id)
  const [selectedItem, setSelectedItem] = React.useState<ReferralStats>()

  const {
    data: referralStats,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [cacheKey.affiliateStats, affiliateID],
    queryFn: () => api.getReferralStats(affiliateID as number),
  })

  const handleNextAndPrevious = async (id: number) => {
    await setAffiliateID(id)
    refetch()
  }

  return (
    <SafeAreaView edges={['bottom']}>
      <ScrollView>
        <ContentContainer>
          {isLoading ? (
            <View style={{marginTop: 20}}>
              <Loader />
            </View>
          ) : (
            <Text h4 h4Style={{marginTop: 20}}>
              {referralStats?.referrer_name} {t('affiliate.referrals')}
            </Text>
          )}

          <View style={[styles.container, styles.tableBorder]}>
            <View style={[styles.headerRow, styles.rowDivider]}>
              <Text style={styles.cellDetails}>{t('common.table-header-description')}</Text>
              <Text style={styles.cellStatus}>{t('common.table-header-status')}</Text>
              <Text style={[styles.cellDate]}>{t('affiliate.downline')}</Text>
            </View>

            {isLoading && (
              <ActivityIndicator
                style={{marginVertical: 20}}
                size='large'
                color={theme.colors.primary}
              />
            )}
            {referralStats?.referrals_stats.length == 0 ? (
              <View style={styles.emptyRow}>
                <Text style={styles.emptyRowText}>{t('common.noRecordsFound')}</Text>
              </View>
            ) : (
              referralStats?.referrals_stats.map((item, index) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index}
                  style={
                    index === referralStats?.referrals_stats.length - 1
                      ? [styles.row, styles.rowWithRadius]
                      : [styles.row, styles.rowDivider]
                  }
                  onPress={() => setSelectedItem(item)}
                >
                  <View style={styles.cellDetails}>
                    <Text style={styles.titleText}>
                      {t('affiliate.payoutCommission.amount')}:{' '}
                      {formatNumber(item.total_amount, {
                        locales: currentLang,
                        maximumFractionDigits: 4,
                      })}
                    </Text>
                    <Text style={styles.labelText}>
                      {t('affiliate.refTable.accountType')}: {item.referral_account_type}
                    </Text>
                    <Text style={styles.labelText}>
                      {t('affiliate.refTable.name')}: {item.referral_full_name}
                    </Text>
                    <Text style={styles.labelText}>
                      {t('affiliate.refTable.email')}: {shorten(item.referral_email, 7)}
                    </Text>
                  </View>
                  <View style={styles.cellStatus}>
                    <StatusBadge
                      status={item.referral_status}
                      label={t(`affiliate.statuses.${item.referral_status}`)}
                    />
                  </View>
                  <View>
                    {item.referral_total_invites !== 0 && (
                      <Button
                        title='View'
                        color='tertiary'
                        onPress={() => handleNextAndPrevious(item.referral_id as number)}
                        containerStyle={{height: 30, width: 60}}
                        titleStyle={{fontSize: 10}}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>

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
              onPress={() => handleNextAndPrevious(referralStats?.previous_referrer_id as number)}
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
  tableBorder: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  emptyRow: {
    padding: 5,
    backgroundColor: colors.background,
    height: 40,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  emptyRowText: {
    textAlign: 'center',
    marginTop: 5,
  },
  headerRow: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: colors.grey4,
  },
  row: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderColor: colors.divider,
  },
  rowWithRadius: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  cellDate: {
    textAlign: 'center',
    fontSize: 12,
    width: '20%',
    color: colors.textPrimary,
  },
  cellDetails: {
    paddingLeft: 5,
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
  labelText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  bottomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shareBtnWrapper: {
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 1.5,
    borderRadius: 8,
    height: 40,
    borderColor: colors.divider,
    columnGap: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
