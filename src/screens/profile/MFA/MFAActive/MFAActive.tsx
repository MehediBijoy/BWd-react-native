import {View, Platform, TouchableOpacity, Linking} from 'react-native'
import {Text, makeStyles, Image} from '@rneui/themed'

import authenticatorImg from 'images/settings/google-2fa-app.png'
import playStoreImg from 'images/settings/get-in-google-play.png'
import appStoreImg from 'images/settings/get-in-app-store.png'

const MFAActive = () => {
  const styles = useStyles()
  const playStoreUrl =
    'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en'
  const appStoreUrl = 'https://apps.apple.com/us/app/google-authenticator/id388497605'

  const playStoreClick = () => {
    Linking.openURL(playStoreUrl).catch(console.log)
  }

  const appStoreClick = () => {
    Linking.openURL(appStoreUrl).catch(console.log)
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>1. Install the 2FA application on your phone</Text>
        <View style={styles.imageContainer}>
          <View style={styles.lefImgBox}>
            <Image source={authenticatorImg} style={styles.authImg} resizeMode='contain' />
            <Text>Google Authenticator</Text>
          </View>
          <View>
            {Platform.OS === 'android' && (
              <TouchableOpacity onPress={playStoreClick}>
                <Image source={playStoreImg} style={styles.img} resizeMode='contain' />
              </TouchableOpacity>
            )}
            {Platform.OS === 'ios' && (
              <Image
                source={appStoreImg}
                style={styles.img}
                onPress={appStoreClick}
                resizeMode='contain'
              />
            )}
          </View>
        </View>
      </View>
    </View>
  )
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  imageContainer: {
    marginTop: 20,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.divider,
  },
  lefImgBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authImg: {
    height: 35,
    width: 50,
  },
  img: {
    height: 50,
    width: 100,
  },
}))

export default MFAActive
