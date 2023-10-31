import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Text, makeStyles} from '@rneui/themed'

import {UserInfo} from 'api/Response'

type PersonalInfoBoxProps = {
  userInfo?: UserInfo
}

const PersonalInfoBox = ({userInfo}: PersonalInfoBoxProps) => {
  const styles = useStyle()
  const {t} = useTranslation()

  return (
    <View style={[styles.container]}>
      <Text h3 h3Style={{marginBottom: 20}}>
        {t('navigation.items.settings')}
      </Text>

      <View style={[styles.textWrapper]}>
        <Text>{t('profile.appSettings.fullName')}:</Text>
        <Text style={[styles.boldText]}>{`${userInfo?.user_detail?.first_name ?? ''} ${
          userInfo?.user_detail?.last_name ?? ''
        }`}</Text>
      </View>

      <View style={[styles.textWrapper]}>
        <Text>{t('profile.appSettings.customerID')}:</Text>
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
    paddingBottom: 10,
    borderBottomColor: colors.bgPaper,
    borderBottomWidth: 1,
  },
  boldText: {
    fontWeight: '700',
    textTransform: 'capitalize',
  },
}))
