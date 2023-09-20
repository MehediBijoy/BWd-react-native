import * as yup from 'yup'
import React from 'react'
import {useQuery, useMutation} from '@tanstack/react-query'
import {Text, makeStyles, Image, Button} from '@rneui/themed'
import {View, Platform, TouchableOpacity, Linking} from 'react-native'

import CopyButton from '@core/CopyButton'
import Form from '@core/Form'
import FormInput from '@core/FormInput'

import {cacheKey} from 'api'
import {useApi} from 'hooks/api'
import {useYupHooks, useProfile} from 'hooks/helper'
import authenticatorImg from 'images/settings/google-2fa-app.png'
import playStoreImg from 'images/settings/get-in-google-play.png'
import appStoreImg from 'images/settings/get-in-app-store.png'
import {User} from 'api/Response'
import {ErrorObject} from 'api/Errors'

const mfaActivationSchema = yup.object().shape({
  mfa_code: yup
    .string()
    .max(6, '2FA code Must 6 digits')
    .min(6, '2FA code Must 6 digits')
    .required('2FA code is required field'),
  activation: yup.bool().default(false),
})

type mfaActivationFields = yup.InferType<typeof mfaActivationSchema>

const MFAActive = () => {
  const api = useApi()
  const styles = useStyles()
  const {setProfile} = useProfile()
  const {methods} = useYupHooks<mfaActivationFields>({schema: mfaActivationSchema})

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

  const {mutate, error} = useMutation<User, ErrorObject, mfaActivationFields>({
    mutationFn: api.proceedMfa,
    onError: () => {
      methods.reset()
    },
    onSuccess: user => {
      console.log(user)
      setProfile(user)
    },
  })

  const onSubmit = (data: mfaActivationFields) => {
    mutate(data)
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
          <Form methods={methods} style={styles.form}>
            <FormInput label='2FA Code' name='mfa_code' placeholder='xxx xxx' />

            <Button
              title='Activate 2FA'
              containerStyle={{maxWidth: '50%'}}
              onPress={methods.handleSubmit(onSubmit)}
            />

            {error && <Text style={styles.error}>{error.message}</Text>}
          </Form>
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
  form: {
    rowGap: 20,
    marginTop: 20,
  },
  error: {
    color: colors.error,
  },
}))

export default MFAActive
