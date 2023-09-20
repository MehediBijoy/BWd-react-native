import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'

import CopyButton from '@core/CopyButton'

import {makeReferralLink} from 'utils'
import {UserInfo} from 'api/Response'

type ReferralInfoBoxProps = {
  userInfo?: UserInfo
}

const ReferralInfoBox = ({userInfo}: ReferralInfoBoxProps) => {
  const styles = useStyle()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Referral Information </Text>

      <View style={[styles.textWrapper, styles.container]}>
        <View style={styles.copyWrapper}>
          {/* {userInfo?.referral_token && <CopyButton toCopy={userInfo?.referral_token} />} */}
          <Text>Referral ID:</Text>
        </View>
        <Text style={{fontWeight: 'bold'}}>{userInfo?.referral_token}</Text>
      </View>
      <View style={styles.copyWrapper}>
        {/* {userInfo?.referral_token && (
          <CopyButton toCopy={makeReferralLink(userInfo?.referral_token)} />
        )} */}
        <Text style={{marginTop: 10}}>Referral Link:</Text>
      </View>
      {userInfo?.referral_token && (
        <CopyButton
          toCopy={makeReferralLink(userInfo?.referral_token)}
          buttonText={
            <Text style={styles.referralLink}>{makeReferralLink(userInfo?.referral_token)}</Text>
          }
        />
      )}

      {/* {userInfo?.user_type !== 'affiliate' && (
        <Button title='Become An Affiliate' containerStyle={{maxWidth: '50%', minHeight: 40}} />
      )} */}
    </View>
  )
}

export default ReferralInfoBox

const useStyle = makeStyles(({colors}) => ({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  copyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 10,
    borderBottomColor: colors.bgPaper,
    borderBottomWidth: 1,
  },
  referralLink: {
    marginTop: 3,
    fontWeight: 'bold',
    paddingBottom: 10,
    borderBottomColor: colors.bgPaper,
    borderBottomWidth: 1,
  },
}))
