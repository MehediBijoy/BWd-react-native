import {View} from 'react-native'
import {Text, makeStyles} from '@rneui/themed'

import {UserInfo} from 'api/Response'

type PersonalInfoBoxProps = {
  userInfo?: UserInfo
}

const PersonalInfoBox = ({userInfo}: PersonalInfoBoxProps) => {
  const styles = useStyle()

  return (
    <View style={[styles.container]}>
      <Text h4 h4Style={{marginBottom: 20}}>
        Settings{' '}
      </Text>

      <View style={[styles.textWrapper]}>
        <Text>Full Name:</Text>
        <Text style={[styles.boldText]}>{`${userInfo?.user_detail?.first_name ?? ''} ${
          userInfo?.user_detail?.last_name ?? ''
        }`}</Text>
      </View>

      <View style={[styles.textWrapper]}>
        <Text>Customer ID:</Text>
        <Text style={[styles.boldText]}>{userInfo?.id}</Text>
      </View>
    </View>
  )
}

export default PersonalInfoBox

const useStyle = makeStyles(({colors}) => ({
  container: {
    marginTop: 20,
  },
  textWrapper: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    padding: 5,
    borderBottomColor: colors.bgPaper,
    borderBottomWidth: 1,
  },
  boldText: {
    fontWeight: '700',
    textTransform: 'capitalize',
  },
}))
