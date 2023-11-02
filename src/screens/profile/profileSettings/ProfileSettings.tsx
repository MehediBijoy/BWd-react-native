import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Link} from '@react-navigation/native'
import {Text, makeStyles} from '@rneui/themed'

import CopyButton from '@core/CopyButton'

import {UserInfo} from 'api/Response'
import {shortAddress} from 'utils'
import {useProfile} from 'hooks/helper'

type ProfileSettingsProps = {
  userInfo?: UserInfo
}

const ProfileSettings = ({userInfo}: ProfileSettingsProps) => {
  const styles = useStyles()
  const {t} = useTranslation()
  const {profile} = useProfile()

  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          <Text>{t('profile.appSettings.email')}:</Text>
          <Text style={styles.boldText}>{userInfo?.email}</Text>
        </View>
        <Link to={{screen: 'ProfileEmailChange'}} style={styles.linkWrapper}>
          {t('common.edit')}
        </Link>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          <Text>{t('profile.appSettings.password')}:</Text>
          <Text style={styles.boldText}>********</Text>
        </View>
        <Link to={{screen: 'ProfilePasswordChange'}} style={styles.linkWrapper}>
          {t('common.edit')}
        </Link>
      </View>

      {/*Note: This functionality will be add in future  */}
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          <Text>{t('profile.appSettings.2FAAuthentication')}:</Text>
          <Text style={styles.boldText}>
            {profile?.google_mfa_activated === true
              ? t('common.activated')
              : t('common.deactivated')}
          </Text>
        </View>

        {/*Note: This functionality will be add in future  */}
        <Link to={{screen: 'ProfileMFA'}} style={[styles.linkWrapper]}>
          {t('common.edit')}
        </Link>
      </View>

      {/*Note: This functionality will be add in future  */}
      {/* <View style={[styles.wrapper]}>
        <View style={[styles.textWrapper]}>
          <Text>Save Payment Methods:</Text>
        </View>
        <Text style={[styles.linkWrapper]}>Edit</Text>
      </View>
       */}

      <View style={styles.wrapper}>
        <Text>{t('profile.appSettings.savePaymentMethods')}:</Text>
        <Text style={{fontSize: 16, marginLeft: 5, marginRight: 10}}>
          {userInfo?.wallet_address ? shortAddress(userInfo.wallet_address) : '-'}
        </Text>
        {userInfo?.wallet_address && <CopyButton toCopy={userInfo.wallet_address} />}
      </View>
    </View>
  )
}

export default ProfileSettings

const useStyles = makeStyles(({colors}) => ({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 10,
    borderBottomColor: colors.bgPaper,
    borderBottomWidth: 1,
  },
  textWrapper: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    alignItems: 'center',
  },
  boldText: {
    fontWeight: '700',
  },
  linkWrapper: {
    color: colors.tertiary,
    backgroundColor: colors.bgPaper,
    padding: 5,
    borderRadius: 6,
  },
}))
