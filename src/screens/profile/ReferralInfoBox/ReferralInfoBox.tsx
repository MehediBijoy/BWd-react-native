import {View} from 'react-native'
import {Button, Text, makeStyles} from '@rneui/themed'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import CopyButton from '@core/CopyButton'

import {makeReferralLink} from 'utils'
import {useProfile} from 'hooks/helper'
import {RouteStack} from 'navigators/routes'

type ReferralInfoBoxProps = {
  navigation: NativeStackScreenProps<RouteStack, 'Settings'>['navigation']
}

const ReferralInfoBox = ({navigation}: ReferralInfoBoxProps) => {
  const styles = useStyle()
  const {profile} = useProfile()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Referral Information </Text>

      <View style={[styles.textWrapper, styles.container]}>
        <View style={styles.copyWrapper}>
          {/* {userInfo?.referral_token && <CopyButton toCopy={userInfo?.referral_token} />} */}
          <Text>Referral ID:</Text>
        </View>
        <Text style={{fontWeight: 'bold'}}>{profile?.referral_token}</Text>
      </View>
      <View style={styles.copyWrapper}>
        {/* {userInfo?.referral_token && (
          <CopyButton toCopy={makeReferralLink(userInfo?.referral_token)} />
        )} */}
        <Text style={{marginTop: 10}}>Referral Link:</Text>
      </View>
      {profile?.referral_token && (
        <CopyButton
          toCopy={makeReferralLink(profile?.referral_token)}
          buttonText={
            <Text style={styles.referralLink}>{makeReferralLink(profile?.referral_token)}</Text>
          }
        />
      )}

      {profile?.user_type !== 'affiliate' && (
        <Button
          title='Become An Affiliate'
          onPress={() => navigation.navigate('ProfileBecomeAffiliate')}
          containerStyle={{maxWidth: '50%', minHeight: 40}}
        />
      )}
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
  linkWrapper: {
    width: 150,
    color: colors.tertiary,
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 6,
  },
  linkText: {
    textAlign: 'center',
    color: colors.tertiary,
  },
}))
