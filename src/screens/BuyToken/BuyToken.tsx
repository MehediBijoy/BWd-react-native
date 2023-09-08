import {useMemo, useState} from 'react'
import {useForm} from 'react-hook-form'
import {Text, Button} from '@rneui/themed'
import {useMutation} from '@tanstack/react-query'
import {SafeAreaView} from 'react-native-safe-area-context'
import {ActivityIndicator, ScrollView, View} from 'react-native'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import ContainContainer from '@core/ContentContainer/ContentContainer'

// import {appInfo} from 'constant'
import useApi from 'hooks/api/useApi'
import {EstimateFee} from 'api/Response'
// import {PaymentPayloadProps} from 'api/Request'
import useAssets from 'hooks/helper/useAssets'

import TierOverviewModal from './TierFeesModal'
import FiatPaymentModal from './FiatPayment/FiatPayment'

type BuyBoxFields = {
  amount: string
  total: string
}

const BuyToken = () => {
  const api = useApi()
  const {data: bwgLimit} = useAssets('BWG')
  const methods = useForm<BuyBoxFields>()
  const {total} = methods.getValues()
  const [inBase, setInBase] = useState(false)
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [isFiatModalOpened, setIsFiatModalOpened] = useState<boolean>(false)

  const {
    mutate: feesRefetch,
    isLoading,
    data: estimatePay,
  } = useMutation({
    mutationFn: () =>
      api.getEstimateFee({
        asset: 'USD',
        target_asset: 'BWG',
        amount: Number(methods.getValues(inBase ? 'amount' : 'total')),
        in_base: inBase,
      }),
    onSuccess: (data: EstimateFee) => {
      if (inBase) methods.setValue('total', data.received_amount)
      else methods.setValue('amount', data.total_amount)
    },
  })

  const onCloseModal = () => {
    setIsOpened(false)
  }

  const isValid = useMemo(() => {
    const value = Number(total)
    const minPaymentAmount = Number(bwgLimit?.min_payment_amount)
    const maxPaymentAmount = Number(bwgLimit?.max_payment_amount)

    return value >= minPaymentAmount && value <= maxPaymentAmount
  }, [total, bwgLimit])

  return (
    <SafeAreaView>
      <ScrollView>
        <ContainContainer>
          <TierOverviewModal isOpened={isOpened} bwgLimit={bwgLimit} onClose={onCloseModal} />
          <FiatPaymentModal
            isOpened={isFiatModalOpened}
            onClose={() => setIsFiatModalOpened(false)}
            estimateFees={estimatePay as EstimateFee}
          />

          <View style={{display: 'flex', rowGap: 20}}>
            <Text h3 h3Style={{}}>
              Purchase BWG
            </Text>

            <Form methods={methods}>
              <FormInput
                name='amount'
                keyboardType='numeric'
                onChangeText={() => {
                  setInBase(true)
                  feesRefetch()
                }}
                placeholder='Enter your amount'
                label='Amount'
                rightElement={isLoading && !inBase ? <ActivityIndicator /> : undefined}
              />

              <FormInput
                keyboardType='numeric'
                name='total'
                placeholder='Enter your amount'
                label='Total'
                onChangeText={() => {
                  setInBase(false)
                  feesRefetch()
                }}
                rightElement={isLoading && inBase ? <ActivityIndicator /> : undefined}
              />

              <Text
                style={{textAlign: 'right', marginBottom: 10}}
                onPress={() => setIsOpened(true)}
              >
                More about the Tier System
              </Text>
              <Button
                title='Buy BWG'
                disabled={!isValid}
                onPress={() => {
                  setIsFiatModalOpened(true)
                }}
              />
            </Form>
          </View>
        </ContainContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

export default BuyToken
