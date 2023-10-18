import React from 'react'
import {useQuery} from '@tanstack/react-query'
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
import {useProfile, usePlatform} from 'hooks/helper'
import {shorten} from 'utils'
import {ReferralStats} from 'api/Response'
import {LegalStuff} from 'constants/legalStuff.config'
import ShareImg from 'images/affiliates/share.svg'

import ReferralUserModal from './ReferralUserModal'

const ReferralTable = () => {
  const api = useApi()
  const styles = useStyles()
  const {theme} = useTheme()
  const {profile} = useProfile()
  const {APP_URL} = usePlatform()

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
      <Text h4>Your Referrals</Text>

      <View style={[styles.container, styles.tableBorder]}>
        <View style={[styles.headerRow, styles.rowDivider]}>
          <Text style={styles.cellDetails}>Description</Text>
          <Text style={styles.cellStatus}>Status</Text>
          <Text style={[styles.cellDate]}>Amount</Text>
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
            <Text style={styles.emptyRowText}>No data found</Text>
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
                  Account Type: {item.referral_account_type.toUpperCase()}
                </Text>
                <Text style={styles.labelText}>Name: {item.referral_full_name}</Text>
                <Text style={styles.labelText}>Email: {shorten(item.referral_email, 7)}</Text>
              </View>
              <View style={styles.cellStatus}>
                <StatusBadge status={item.referral_status} label={item.referral_status} />
              </View>
              <Text style={styles.cellDate}>{item.total_amount}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      <View style={styles.bottomWrapper}>
        <Button
          title='Affiliate Terms & Conditions'
          onPress={() => Linking.openURL(LegalStuff.affiliateTerms)}
          containerStyle={{
            marginVertical: 10,
            width: '80%',
          }}
        />

        <View style={styles.shareBtnWrapper}>
          <TouchableWithoutFeedback onPress={onShare}>
            <ShareImg height={20} width={20} />
          </TouchableWithoutFeedback>
        </View>
      </View>

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
    borderWidth: 0.5,
    borderRadius: 5,
    height: 35,
    width: 35,
    borderColor: colors.divider,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
