import {View} from 'react-native'
import {Link} from '@react-navigation/native'
import {Text, makeStyles} from '@rneui/themed'

import {UserInfo} from 'api/Response'

type ProfileSettingsProps = {
  userInfo?: UserInfo
}

const ProfileSettings = ({userInfo}: ProfileSettingsProps) => {
  const styles = useStyles()

  return (
    <View style={[styles.container]}>
      <View style={[styles.wrapper]}>
        <View style={[styles.textWrapper]}>
          <Text>Email:</Text>
          <Text style={[styles.boldText]}>{userInfo?.email}</Text>
        </View>
        <Link to={{screen: 'Purchase'}} style={[styles.linkWrapper]}>
          Edit
        </Link>
      </View>
      <View style={[styles.wrapper]}>
        <View style={[styles.textWrapper]}>
          <Text>Password:</Text>
          <Text style={[styles.boldText]}>********</Text>
        </View>
        <Link to={{screen: 'Purchase'}} style={[styles.linkWrapper]}>
          Edit
        </Link>
      </View>
      <View style={[styles.wrapper]}>
        <View style={[styles.textWrapper]}>
          <Text>2FA Authentication:</Text>
          <Text style={[styles.boldText]}>
            {userInfo?.google_mfa_activated === true ? 'Activated' : 'Deactivated'}
          </Text>
        </View>
        <Link to={{screen: 'Purchase'}} style={[styles.linkWrapper]}>
          Edit
        </Link>
      </View>
    </View>
  )
}

export default ProfileSettings

const useStyles = makeStyles(({colors}) => ({
  container: {
    marginTop: 20,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 5,
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
    alignItems: 'center',
    width: 40,
    color: colors.tertiary,
  },
}))
