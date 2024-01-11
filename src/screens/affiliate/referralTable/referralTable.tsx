import React from 'react'
import {useTranslation} from 'react-i18next'
import {useQuery} from '@tanstack/react-query'
import {useNavigation} from '@react-navigation/native'
import {DrawerNavigationProp} from '@react-navigation/drawer'
import {Text, makeStyles, useTheme, Button} from '@rneui/themed'
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Linking,
  Share,
  TouchableWithoutFeedback,
} from 'react-native'

import StatusBadge from '@core/StatusBadge'

import {useApi} from 'hooks/api'
import {cacheKey} from 'api/CacheKey'
import {useLocales} from 'hooks/states'
import {ReferralStats} from 'api/Response'
import {formatNumber, shorten} from 'utils'
import {RouteStack} from 'navigators/routes'
import {useProfile, usePlatform} from 'hooks/helper'
import {LegalStuff} from 'constants/legalStuff.config'
import ShareImg from 'images/affiliates/share.svg'

import ReferralUserModal from './ReferralUserModal'

const ReferralTable = () => {
  const api = useApi()
  const styles = useStyles()
  const {theme} = useTheme()
  const {t} = useTranslation()
  const {profile} = useProfile()
  const {APP_URL} = usePlatform()
  const {currentLang} = useLocales()
  const navigation = useNavigation<DrawerNavigationProp<RouteStack, 'DownLine'>>()

  const [selectedItem, setSelectedItem] = React.useState<ReferralStats>()

  const {data: referralStats, isLoading} = useQuery({
    queryKey: [cacheKey.affiliateStats, profile?.id],
    queryFn: () => api.getReferralStats(profile?.id as number),
  })

  const onShare = async () => {
    try {
      await Share.share({
        message: `${APP_URL}/invite?token=${profile?.referral_token}`,
        title: 'Share',
      })
    } catch (error) {
      // Alert.alert(error.message)
    }
  }

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text h4>{t('affiliate.referralTitle')}</Text>
        <Button
          color='primary'
          title={t('affiliate.yourDownLine')}
          onPress={() => navigation.navigate('DownLine')}
          containerStyle={{
            marginVertical: 10,
          }}
        />
      </View>

      <View style={[styles.container, styles.tableBorder]}>
        <View style={[styles.headerRow, styles.rowDivider]}>
          <Text style={styles.cellDetails}>{t('common.table-header-description')}</Text>
          <Text style={styles.cellStatus}>{t('common.table-header-status')}</Text>
          <Text style={[styles.cellDate]}>{t('affiliate.payoutCommission.amount')}</Text>
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
                  {t('affiliate.refTable.amount')}: {item.referral_account_type.toUpperCase()}
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
              <Text style={styles.cellDate}>
                {formatNumber(item.total_amount, {minimumFractionDigits: 4, locales: currentLang})}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      <Button
        title={t('affiliate.termsAndConditions')}
        onPress={() => Linking.openURL(LegalStuff.affiliateTerms)}
        containerStyle={{
          marginVertical: 10,
        }}
      />

      <TouchableWithoutFeedback onPress={onShare}>
        <View style={styles.shareBtnWrapper}>
          <Text>{t('affiliate.shareReferralLink')}</Text>
          <ShareImg height={20} width={20} />
        </View>
      </TouchableWithoutFeedback>

      {selectedItem && (
        <ReferralUserModal
          isOpened
          onClose={() => setSelectedItem(undefined)}
          data={selectedItem}
        />
      )}
    </View>
  )
}

export default ReferralTable

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
