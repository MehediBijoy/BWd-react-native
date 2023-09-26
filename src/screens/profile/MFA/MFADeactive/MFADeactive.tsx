import * as yup from 'yup'
import {View} from 'react-native'
import {useQuery, useMutation} from '@tanstack/react-query'
import {Text, Button, makeStyles} from '@rneui/themed'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import Form from '@core/Form'
import FormInput from '@core/FormInput'

import {cacheKey} from 'api'
import {useApi} from 'hooks/api'
import {useProfile, useYupHooks} from 'hooks/helper'
import {ProceedMfaResponse} from 'api/Response'
import {ErrorObject} from 'api/Errors'
import {RouteStack} from 'navigators/routes'

const mfaDeActiveSchema = yup.object().shape({
  mfa_code: yup
    .string()
    .max(6, '2FA code Must 6 digits')
    .min(6, '2FA code Must 6 digits')
    .required('2FA code is required field'),
  activation: yup.bool().default(false),
})

type mfaDeActivationFields = yup.InferType<typeof mfaDeActiveSchema>

type MFADeactiveProps = {
  navigation: NativeStackScreenProps<RouteStack, 'ProfileMFA'>['navigation']
}

const MFADeactive = ({navigation}: MFADeactiveProps) => {
  const api = useApi()
  const styles = useStyles()
  const {setProfile} = useProfile()

  const {methods} = useYupHooks<mfaDeActivationFields>({schema: mfaDeActiveSchema})

  const {refetch: regenerateMfaSecret} = useQuery({
    queryKey: [cacheKey.mfaSecret],
    queryFn: api.createNewMfa,
    staleTime: Infinity,
    initialData: null,
  })

  const {mutate, error} = useMutation<ProceedMfaResponse, ErrorObject, mfaDeActivationFields>({
    mutationFn: api.proceedMfa,
    onError: () => {
      methods.reset()
    },
    onSuccess: ({user}) => {
      regenerateMfaSecret()
      setProfile(user)
      navigation.navigate('Settings')
    },
  })

  const onSubmit = (data: mfaDeActivationFields) => {
    mutate(data)
  }

  return (
    <View style={{marginTop: 20}}>
      <Text h4>Deactivate 2FA</Text>
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
  )
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    marginTop: 20,
  },
  form: {
    rowGap: 20,
    marginTop: 20,
  },
  error: {
    color: colors.error,
  },
}))

export default MFADeactive
