import * as yup from 'yup'
import {useState} from 'react'
import {ActivityIndicator, ScrollView, View} from 'react-native'
import {Text, Button, Icon} from '@rneui/themed'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useMutation} from '@tanstack/react-query'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import ContainContainer from '@core/ContentContainer/ContentContainer'

// import {appInfo} from 'constant'
import useApi from 'hooks/api/useApi'
import {formatEstimatePay} from 'utils'
import {EstimateFee} from 'api/Response'
import {PaymentPayloadProps} from 'api/Request'
import useYupHooks from 'hooks/helper/useYupHooks'
import useAssets from 'hooks/helper/useAssets'

import TierOverviewModal from './TierFeesModal'

const BuyBoxSchema = yup.object().shape({
  amount: yup.string(),
  total: yup.string(),
})

type BuyBoxFields = yup.InferType<typeof BuyBoxSchema>

const BuyToken = () => {
  const api = useApi()
  const {data: bwgLimit} = useAssets('BWG')
  const {methods} = useYupHooks<BuyBoxFields>({schema: BuyBoxSchema})
  const [inBase, setInBase] = useState(false)
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const {mutate, isLoading} = useMutation({
    mutationFn: api.getEstimateFee,
    onSuccess: (data: EstimateFee) => {
      const estimateFee = formatEstimatePay(data)
      if (inBase) methods.setValue('total', estimateFee.received_amount)
      else methods.setValue('amount', estimateFee.total_amount)
    },
    onError: console.log,
  })

  const onFieldChanged = (name: string) => {
    if (name === 'amount') {
      setInBase(true)
    } else {
      setInBase(false)
    }
    let params: PaymentPayloadProps = {
      target_asset: 'BWG',
      asset: 'USD',
      amount: inBase ? Number(methods.getValues().amount) : Number(methods.getValues().total),
      in_base: inBase,
    }
    mutate({...params})
  }

  const onCloseModal = () => {
    setIsOpened(false)
  }

  const onSubmit = () => {
    console.log(methods.getValues)
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <ContainContainer>
          <TierOverviewModal isOpened={isOpened} bwgLimit={bwgLimit} onClose={onCloseModal} />
          <View style={{display: 'flex'}}>
            <Text h3 h3Style={{}}>
              Purchase BWG
            </Text>
            <Form methods={methods}>
              <FormInput
                name='amount'
                keyboardType='numeric'
                onChangeText={() => onFieldChanged('amount')}
                placeholder='Enter your amount'
                color='bgPaper'
                label={''}
                rightElement={isLoading && !inBase ? <ActivityIndicator /> : <></>}
              />
              <FormInput
                keyboardType='numeric'
                name='total'
                placeholder='Enter your amount'
                label={''}
                onChangeText={() => onFieldChanged('total')}
                rightElement={isLoading && inBase ? <ActivityIndicator /> : <></>}
                color='bgPaper'
              />

              <Text
                style={{textAlign: 'right', marginBottom: 10}}
                onPress={() => setIsOpened(true)}
              >
                More about the Tier System
              </Text>
              <Button title='Buy BWG' onPress={methods.handleSubmit(onSubmit)} />
            </Form>
          </View>
        </ContainContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

export default BuyToken
