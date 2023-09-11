import {useMemo, useState} from 'react'
import {useForm} from 'react-hook-form'
import {Text, Button} from '@rneui/themed'
import {useMutation} from '@tanstack/react-query'
import {ActivityIndicator, ScrollView, View} from 'react-native'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import ContainContainer from '@core/ContentContainer'

// import {appInfo} from 'constant'
import useApi from 'hooks/api/useApi'
import {useDebounce, useAssets} from 'hooks/helper'
import {EstimateFee} from 'api/Response'
import {PaymentProps} from 'api/Request'

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
    mutate,
    isLoading,
    data: estimateFees,
  } = useMutation<EstimateFee, any, Partial<PaymentProps>>({
    mutationFn: ({amount, in_base}) =>
      api.getEstimateFee({
        asset: 'USD',
        target_asset: 'BWG',
        amount: amount as string,
        in_base: in_base as boolean,
      }),
    onSuccess: (data: EstimateFee) => {
      if (inBase) methods.setValue('total', data.received_amount)
      else methods.setValue('amount', data.total_amount)
    },
    onError: () => {
      if (inBase) methods.resetField('total')
      methods.resetField('amount')
    },
  })

  const feesRefetch = useDebounce(mutate)
  const onChange = (value: string, inputType: boolean) => {
    setInBase(inputType)
    feesRefetch({amount: value, in_base: inputType})
  }

  const isValid = useMemo(() => {
    if (!bwgLimit && !total) return false

    const value = Number(total)
    const minPaymentAmount = Number(bwgLimit?.min_payment_amount)
    const maxPaymentAmount = Number(bwgLimit?.max_payment_amount)

    return value >= minPaymentAmount && value <= maxPaymentAmount
  }, [total, bwgLimit])

  return (
    <ScrollView>
      <ContainContainer>
        <TierOverviewModal
          isOpened={isOpened}
          bwgLimit={bwgLimit}
          onClose={() => setIsOpened(false)}
        />

        <FiatPaymentModal
          isOpened={isFiatModalOpened}
          onClose={() => {
            methods.reset()
            setIsFiatModalOpened(false)
          }}
          estimateFees={estimateFees as EstimateFee}
          in_base={inBase}
        />

        <View style={{display: 'flex', rowGap: 20}}>
          <Text h3>Purchase BWG</Text>

          <Form methods={methods} style={{rowGap: 15}}>
            <FormInput
              name='amount'
              label='Amount'
              keyboardType='numeric'
              placeholder='Enter your amount'
              onChangeText={value => onChange(value, true)}
              rightElement={isLoading && !inBase ? <ActivityIndicator /> : undefined}
            />

            <FormInput
              name='total'
              label='Total'
              keyboardType='numeric'
              placeholder='Enter your amount'
              onChangeText={value => onChange(value, false)}
              rightElement={isLoading && inBase ? <ActivityIndicator /> : undefined}
            />

            <Text style={{textAlign: 'right'}} onPress={() => setIsOpened(true)}>
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
  )
}

export default BuyToken
