import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Button, Text, makeStyles} from '@rneui/themed'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import CopyButton from '@core/CopyButton'

import {RouteStack} from 'navigators/routes'
import {usePlatform, useProfile} from 'hooks/helper'

type ReferralInfoBoxProps = {
  navigation: NativeStackScreenProps<RouteStack, 'Settings'>['navigation']
}

const ReferralInfoBox = ({navigation}: ReferralInfoBoxProps) => {
  const styles = useStyle()
  const {t} = useTranslation()
  const {APP_URL} = usePlatform()
  const {profile} = useProfile()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('profile.appSettings.referralInformation')}</Text>

      <View style={[styles.textWrapper, styles.container]}>
        <Text>{t('profile.appSettings.referralLink')}:</Text>
        {profile?.referral_token && (
          <CopyButton toCopy={`${APP_URL}/invite?token=${profile.referral_token}`} />
        )}
      </View>

      {profile?.user_type !== 'affiliate' && (
        <Button
          title={t('profile.appSettings.becomeAffiliate')}
          onPress={() => navigation.navigate('ProfileBecomeAffiliate')}
          containerStyle={{minHeight: 40, marginTop: 20}}
        />
      )}
    </View>
  )
}

export default ReferralInfoBox

const useStyle = makeStyles(({colors}) => ({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 10,
    borderBottomColor: colors.bgPaper,
    borderBottomWidth: 1,
  },
}))
