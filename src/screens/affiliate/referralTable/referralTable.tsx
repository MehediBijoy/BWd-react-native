import React from 'react'
import {useTranslation} from 'react-i18next'
import {useQuery} from '@tanstack/react-query'
import {useNavigation} from '@react-navigation/native'
import {DrawerNavigationProp} from '@react-navigation/drawer'
import {Text, makeStyles, Button} from '@rneui/themed'
import {View, Linking, Share, TouchableWithoutFeedback} from 'react-native'

import {Table} from '@core/Table'

import {useApi} from 'hooks/api'
import {cacheKey} from 'api/CacheKey'
import {useLocales} from 'hooks/states'
import {ReferralStats} from 'api/Response'
import {RouteStack} from 'navigators/routes'
import {useProfile, usePlatform} from 'hooks/helper'
import {LegalStuff} from 'constants/legalStuff.config'
import ShareImg from 'images/affiliates/share.svg'
import {formatReferralStats} from 'utils/response'

import ReferralUserModal from './ReferralUserModal'

const ReferralTable = () => {
  const api = useApi()
  const styles = useStyles()
  const {t} = useTranslation()
  const {profile} = useProfile()
  const {APP_URL} = usePlatform()
  const {currentLang} = useLocales()
  const navigation = useNavigation<DrawerNavigationProp<RouteStack, 'DownLine'>>()

  const [selectedItem, setSelectedItem] = React.useState<ReferralStats>()

  const {data: referralStats, isLoading} = useQuery({
    queryKey: [cacheKey.affiliateStats, profile?.id],
    queryFn: () =>
      api
        .getReferralStats(profile?.id as number)
        .then(result => formatReferralStats(result, currentLang, t)),
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

  const config = [
    {
      fields: ['referralAccount', 'referralName', 'referralEmail'],
      cellStyle: styles.cellDetails,
      textStyle: [styles.titleText],
    },
    {
      fields: ['referral_status'],
      types: ['badge'],
      cellStyle: styles.cellStatus,
    },
    {
      fields: ['totalAmount'],
      cellStyle: styles.cellDate,
    },
  ]
  return (
    <>
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

      <Table
        containerStyle={styles.container}
        config={config}
        data={referralStats?.referrals_stats}
        isLoading={isLoading}
        localKeyPrefix={'affiliate.table'}
        onPress={param => setSelectedItem(param)}
      />

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
    </>
  )
}

export default ReferralTable

const useStyles = makeStyles(({colors}) => ({
  container: {
    backgroundColor: colors.background,
    marginVertical: 10,
  },
  cellDate: {
    alignItems: 'flex-end',
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
  labelText: {
    fontSize: 14,
    color: colors.textPrimary,
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
