import {View} from 'react-native'
import {Link} from '@react-navigation/native'
import {Text, makeStyles} from '@rneui/themed'

import {UserInfo} from 'api/Response'
import {updateWalletConnectTitle} from 'utils'

type ProfileSettingsProps = {
  userInfo?: UserInfo
}

const ProfileSettings = ({userInfo}: ProfileSettingsProps) => {
  const styles = useStyles()

  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          <Text>Email:</Text>
          <Text style={styles.boldText}>{userInfo?.email}</Text>
        </View>
        <Link to={{screen: 'ProfileEmailChange'}} style={styles.linkWrapper}>
          <Text style={styles.editText}> Edit</Text>
        </Link>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          <Text>Password:</Text>
          <Text style={styles.boldText}>********</Text>
        </View>
        <Link to={{screen: 'ProfilePasswordChange'}} style={styles.linkWrapper}>
          <Text style={styles.editText}> Edit</Text>
        </Link>
      </View>

      {/*Note: This functionality will be add in future  */}
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          <Text>2FA Authentication:</Text>
          <Text style={styles.boldText}>
            {userInfo?.google_mfa_activated === true ? 'Activated' : 'Deactivated'}
          </Text>
        </View>

        {/*Note: This functionality will be add in future  */}
        {/* <Link to={{screen: 'MFA'}} style={[styles.linkWrapper]}>
          <Text style={[styles.editText]}> Edit </Text>
        </Link> */}
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
        {/* {userInfo?.wallet_address && <CopyButton toCopy={userInfo?.wallet_address} />} */}
        <Text>Saved Wallet Address:</Text>
        <Text style={{fontSize: 16, marginLeft: 5}}>
          {updateWalletConnectTitle(userInfo?.wallet_address)}
        </Text>
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
    width: 40,
    color: colors.tertiary,
    backgroundColor: colors.bgPaper,
    padding: 5,
    borderRadius: 6,
  },
  editText: {
    textAlign: 'center',
    color: colors.tertiary,
  },
}))
