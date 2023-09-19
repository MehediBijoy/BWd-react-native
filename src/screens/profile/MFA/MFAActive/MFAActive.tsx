import * as yup from 'yup'
import {useQuery} from '@tanstack/react-query'
import {View, Platform, TouchableOpacity, Linking} from 'react-native'
import {Text, makeStyles, Image} from '@rneui/themed'

import CopyButton from '@core/CopyButton'
import Form from '@core/Form'
import FormInput from '@core/FormInput'

import {cacheKey} from 'api'
import {useApi} from 'hooks/api'
import authenticatorImg from 'images/settings/google-2fa-app.png'
import playStoreImg from 'images/settings/get-in-google-play.png'
import appStoreImg from 'images/settings/get-in-app-store.png'

const mafaActivationSchema = yup.object().shape({
  mfa_code: yup.string().max(6, '2FA code Must 6 digits').min(6, '2FA code Must 6 digits'),
  activation: yup.bool().default(false),
})

const MFAActive = () => {
  const styles = useStyles()
  const api = useApi()
  const playStoreUrl =
    'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en'
  const appStoreUrl = 'https://apps.apple.com/us/app/google-authenticator/id388497605'

  const playStoreClick = () => {
    Linking.openURL(playStoreUrl).catch(console.log)
  }

  const appStoreClick = () => {
    Linking.openURL(appStoreUrl).catch(console.log)
  }

  const {
    data: mfaInfo,
    // isLoading: createMfaLoading,
    // error: createMfaError,
  } = useQuery({
    queryKey: [cacheKey.mfaSecret],
    queryFn: api.createNewMfa,
    staleTime: Infinity,
  })

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

        <View style={styles.container}>
          <Text style={styles.title}>2. Copy the key and paste it in the authentication app</Text>

          {mfaInfo && (
            <View style={styles.mfaContainer}>
              <Text style={styles.mfaText}>{mfaInfo.google_secret}</Text>
              <CopyButton toCopy={mfaInfo.google_secret} />
            </View>
          )}
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>3. Enter the 2FA code and click &quot;Activate&quot;</Text>
          {/* <Form>
            <FormInput label='2FA Code' name='mfa_code' />
          </Form> */}
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
  mfaContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    gap: 5,
  },
  mfaText: {
    fontSize: 14,
    fontWeight: '600',
  },
}))

export default MFAActive
