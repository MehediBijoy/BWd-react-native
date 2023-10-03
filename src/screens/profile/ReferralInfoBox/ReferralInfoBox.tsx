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
        <Text>Referral ID:</Text>
        <Text style={{fontWeight: 'bold'}}>{profile?.referral_token}</Text>
      </View>

      <View style={[styles.textWrapper, styles.container]}>
        <Text>Referral Link:</Text>
        {profile?.referral_token && (
          <CopyButton toCopy={makeReferralLink(profile?.referral_token)} />
        )}
      </View>

      {profile?.user_type !== 'affiliate' && (
        <Button
          title='Become An Affiliate'
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
