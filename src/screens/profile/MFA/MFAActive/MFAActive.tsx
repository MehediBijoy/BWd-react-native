import * as yup from 'yup'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {useQuery, useMutation} from '@tanstack/react-query'
import {Text, makeStyles, Image, Button} from '@rneui/themed'
import {View, Platform, TouchableOpacity, Linking} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import CopyButton from '@core/CopyButton'
import Form from '@core/Form'
import FormInput from '@core/FormInput'

import {cacheKey} from 'api'
import {useApi} from 'hooks/api'
import {useYupHooks, useProfile} from 'hooks/helper'
import authenticatorImg from 'images/settings/google-2fa-app.png'
import playStoreImg from 'images/settings/get-in-google-play.png'
import appStoreImg from 'images/settings/get-in-app-store.png'
import {ProceedMfaResponse} from 'api/Response'
import {ErrorObject} from 'api/Errors'
import {RouteStack} from 'navigators/routes'

const mfaActivationSchema = yup.object().shape({
  mfa_code: yup.string().max(6).min(6).required(),
  activation: yup.bool().default(true),
})

type mfaActivationFields = yup.InferType<typeof mfaActivationSchema>

type MfaActiveProps = {
  navigation: NativeStackScreenProps<RouteStack, 'ProfileMFA'>['navigation']
}

const MFAActive = ({navigation}: MfaActiveProps) => {
  const api = useApi()

  const {t} = useTranslation()
  const styles = useStyles()
  const {setProfile} = useProfile()
  const {methods} = useYupHooks<mfaActivationFields>({schema: mfaActivationSchema})

  const playStoreUrl =
    'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en'
  const appStoreUrl = 'https://apps.apple.com/us/app/google-authenticator/id388497605'

  const playStoreClick = () => {
    Linking.openURL(playStoreUrl).catch()
  }

  const appStoreClick = () => {
    Linking.openURL(appStoreUrl).catch()
  }

  const {data: mfaInfo} = useQuery({
    queryKey: [cacheKey.mfaSecret],
    queryFn: api.createNewMfa,
    staleTime: Infinity,
  })

  const {mutate, error} = useMutation<ProceedMfaResponse, ErrorObject, mfaActivationFields>({
    mutationFn: api.proceedMfa,
    onError: () => {
      methods.reset()
    },
    onSuccess: ({user}) => {
      setProfile(user)
      navigation.navigate('Settings')
    },
  })

  const onSubmit = (data: mfaActivationFields) => {
    mutate(data)
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{t('profile.security.mfa.activate.step1')}</Text>
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
          <Text style={styles.title}>{t('profile.security.mfa.activate.step2')}</Text>

          {mfaInfo && (
            <View style={styles.mfaContainer}>
              <Text style={styles.mfaText}>{mfaInfo.google_secret}</Text>
              <CopyButton toCopy={mfaInfo.google_secret} />
            </View>
          )}
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>{t('profile.security.mfa.activate.step3')}</Text>
          <Form methods={methods} style={styles.form}>
            <FormInput label={t('modal2fa.inputLabel')} name='mfa_code' placeholder='xxx xxx' />

            <Button
              title={t('profile.security.mfa.activate.button')}
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
    columnGap: 10,
    alignItems: 'center',
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
