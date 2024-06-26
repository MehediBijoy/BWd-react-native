import * as yup from 'yup'
import React from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useMutation} from '@tanstack/react-query'
import {Button, Icon, Text, makeStyles, useTheme} from '@rneui/themed'

import Form from '@core/Form'
import Modal from '@core/Modal'
import FormInput from '@core/FormInput'
import Pressable from '@core/Pressable'
import BottomSheet from '@core/BottomSheet'

import {SetErrorKey} from 'types'
import {useApi} from 'hooks/api'
import {User} from 'api/Response'
import {ErrorObject} from 'api/Errors'
import {UserWalletProps} from 'api/Request'
import {shortAddress, alpha} from 'utils'
import {isMfaRequired} from 'utils/response'
import {useWalletController} from 'hooks/states'
import {useProfile, useYupHooks} from 'hooks/helper'
import {chain} from 'constants/wallet.config'
import WalletDisconnect from 'components/modals/WalletDisconnect'
import {useWallet, useSetToken, useChainId, useNetwork} from 'hooks/crypto'

const mfaSchema = yup.object().shape({
  mfa_code: yup.string().max(6).min(6),
})

const confirmSchema = yup.object().shape({
  token: yup.string().required(),
})

type MfaTypes = yup.InferType<typeof mfaSchema>
type ConfirmTokenTypes = yup.InferType<typeof confirmSchema>

const WalletController = () => {
  const api = useApi()
  const {theme} = useTheme()
  const {t} = useTranslation()
  const styles = useStyles()
  const setToken = useSetToken()
  const {setNetwork, isSwitchLoading} = useNetwork()
  const {isOpened, setIsOpened} = useWalletController()
  const {profile, setProfile, refetch: profileRefetch} = useProfile()
  const {address, isConnected, isEnabled, provider, isChainConnected} = useWallet()

  const [isSubmitEmail, setIsSubmitEmail] = React.useState<boolean>(false)
  const [isDisconnectModal, setIsDisconnectModal] = React.useState<boolean>(false)

  const {methods: mfaForm} = useYupHooks<MfaTypes>({schema: mfaSchema})
  const {methods: confirmForm} = useYupHooks<ConfirmTokenTypes>({schema: confirmSchema})

  const mfaMutation = useMutation<User, ErrorObject, Partial<UserWalletProps>>({
    mutationFn: ({...props}) =>
      api.userWallet({
        id: profile?.id as number,
        wallet_address: address as string,
        wallet_type: 'walletConnect',
        ...props,
      }),
    onSuccess: user => {
      setProfile(user)
      if (!user.google_mfa_activated) {
        setIsSubmitEmail(true)
      }
    },
    onError: error => {
      if (isMfaRequired(error)) {
        mfaForm.setError('mfa_code' as SetErrorKey, {
          type: 'validate',
          message: error.message,
        })
      }
    },
  })

  const confirmMutation = useMutation({
    mutationFn: api.walletChangeWithToken,
  })

  const {subscribe, unsubscribe} = useChainId()

  React.useEffect(() => {
    subscribe(provider)
    return () => unsubscribe(provider)
  }, [provider, subscribe, unsubscribe])

  return (
    <>
      <BottomSheet
        style={{rowGap: 10}}
        title={t('common.options')}
        isOpened={isOpened}
        onClose={() => setIsOpened(false)}
      >
        <WalletDisconnect
          isOpened={isDisconnectModal}
          onClose={() => setIsDisconnectModal(false)}
        />
        <Pressable style={styles.item}>
          <Icon name='wallet' size={35} color={styles.item.color} />
          <Text style={[styles.text, {color: styles.item.color}]}>
            {(address && shortAddress(address, 10)) ?? '-'}
          </Text>
        </Pressable>

        <Pressable style={styles.item} onPress={setToken}>
          <Icon name='add-chart' size={35} color={styles.item.color} />
          <Text style={[styles.text, {color: styles.item.color}]}>
            {t('walletConnect.trackInWallet')}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.item, {backgroundColor: alpha(theme.colors.error, 0.1)}]}
          onPress={() => setIsDisconnectModal(true)}
        >
          <Icon name='exit-to-app' size={35} color={theme.colors.error} />
          <Text style={[styles.text, {color: theme.colors.error}]}>
            {t('walletConnect.disconnect')}
          </Text>
        </Pressable>
      </BottomSheet>

      {isConnected && !isChainConnected && (
        <BottomSheet
          title={t('walletConnect.unsupportedChain')}
          isOpened
          onClose={() => setIsDisconnectModal(true)}
        >
          <View style={[styles.alertContainer, {marginBottom: 15}]}>
            <Icon name='warning' color={styles.icon.color} size={30} />
            <Text style={styles.alertText}>
              {t('walletConnect.unsupportedChainDescription', {chainName: chain.name})}
            </Text>
          </View>
          <Button
            color='error'
            icon={
              <Icon
                name='exchange'
                type='font-awesome'
                iconStyle={{marginRight: 10, color: theme.colors.textReverse}}
              />
            }
            title={t('walletConnect.switchNetwork')}
            onPress={() => setNetwork()}
            loading={isSwitchLoading}
          />
          <WalletDisconnect
            isOpened={isDisconnectModal}
            onClose={() => setIsDisconnectModal(false)}
          />
        </BottomSheet>
      )}

      {isEnabled && profile?.wallet_address && (
        <Modal
          title={t('wallet.change.title')}
          isOpened={profile?.wallet_address !== address}
          onClose={() => setIsDisconnectModal(true)}
        >
          <View style={{rowGap: 15}}>
            {!isSubmitEmail ? (
              <>
                <View>
                  <Text style={styles.text}>{t('wallet.change.label.address')}</Text>
                  <Text style={styles.subText}>{t('walletConnect.walletConnect')}</Text>
                </View>
                <View>
                  <Text style={styles.text}>{t('wallet.change.label.address')}</Text>
                  <Text style={styles.subText}>{shortAddress(address as string, 15)}</Text>
                </View>

                {profile && profile.google_mfa_activated ? (
                  <Form methods={mfaForm} style={{rowGap: 15}}>
                    <FormInput
                      name='mfa_code'
                      label={t('modal2fa.inputLabel')}
                      placeholder={t('modal2fa.title')}
                    />
                    <Button
                      title={t('wallet.change.changeButton')}
                      loading={mfaMutation.isLoading}
                      onPress={mfaForm.handleSubmit(({mfa_code}) => mfaMutation.mutate({mfa_code}))}
                    />
                  </Form>
                ) : (
                  <Button
                    title={t('wallet.change.changeButton')}
                    onPress={() => mfaMutation.mutate({})}
                    loading={mfaMutation.isLoading}
                  />
                )}
              </>
            ) : (
              <>
                <View style={styles.alertContainer}>
                  <Icon name='warning' color={styles.icon.color} size={30} />
                  <Text style={styles.alertText}>{t('walletConnect.walletChangeWithEmail')}</Text>
                </View>
                <Form methods={confirmForm} style={{rowGap: 15}}>
                  <FormInput
                    name='token'
                    label={t('register.emailConfirmation.code')}
                    placeholder={t('register.emailConfirmation.inputLabel')}
                  />
                  <Button
                    title={t('wallet.change.changeButton')}
                    onPress={confirmForm.handleSubmit(({token}) =>
                      confirmMutation.mutateAsync(token).then(() => profileRefetch())
                    )}
                    loading={confirmMutation.isLoading}
                  />
                </Form>
              </>
            )}
          </View>
          <WalletDisconnect
            isOpened={isDisconnectModal}
            onClose={() => setIsDisconnectModal(false)}
          />
        </Modal>
      )}
    </>
  )
}

const useStyles = makeStyles(({colors}) => ({
  item: {
    height: 45,
    borderRadius: 5,
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    color: colors.tertiary,
    backgroundColor: alpha(colors.tertiary, 0.1),
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  subText: {
    fontSize: 16,
    fontWeight: '600',
  },
  alertContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.bgPaper,
    columnGap: 15,
    padding: 15,
    borderRadius: 5,
  },
  alertText: {
    fontSize: 16,
  },
  icon: {
    color: colors.warning,
  },
}))

export default WalletController
