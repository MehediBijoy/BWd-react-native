import {useQuery} from '@tanstack/react-query'
import {Text, makeStyles, useTheme} from '@rneui/themed'
import {ActivityIndicator, View, TouchableOpacity} from 'react-native'

import StatusBadge from '@core/StatusBadge'

import {useApi} from 'hooks/api'
import {cacheKey} from 'api/CacheKey'
import {useProfile} from 'hooks/helper'
import {formatDate} from 'utils'
// import {ReferralAccount} from 'api/Response'

const ReferralTable = () => {
  const api = useApi()
  const styles = useStyles()
  const {theme} = useTheme()
  const {profile} = useProfile()
  const {data: referralStats, isLoading} = useQuery({
    queryKey: [cacheKey.affiliateStats, profile?.id],
    queryFn: () => api.getReferralStats(profile?.id as number),
  })

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
        {referralStats?.data.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={
              index === referralStats?.data.length - 1
                ? [styles.rowWithRadius, styles.rowWithRadius]
                : [styles.row, styles.rowDivider]
            }
            // onPress={() => setSelectedId(item.id)}
          >
            <View style={styles.cellDetails}>
              <Text style={styles.titleText}>Account Type: {item.referral_account_type}</Text>
              <Text style={styles.subText}>
                <Text style={styles.labelText}>Friend&apos;s User ID:</Text> {item.referral_id}
              </Text>
              <Text style={styles.subText}>
                <Text style={styles.labelText}>Joining Date:</Text>{' '}
                {formatDate(new Date(item.referral_joined_at), 'long')}
              </Text>
            </View>
            <View style={styles.cellStatus}>
              <StatusBadge status={'completed'} label={item.referral_status} />
            </View>
            <Text style={styles.cellDate}>{item.total_amount}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  headerRow: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: colors.bgPaper,
  },
  row: {
    padding: 5,
    height: 90,
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
  subText: {
    fontSize: 11,
    color: colors.textPrimary,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.tertiary,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
}))
