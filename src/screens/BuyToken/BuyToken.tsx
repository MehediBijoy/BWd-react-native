import {useForm} from 'react-hook-form'
import React, {useMemo, useState} from 'react'
import {useMutation, useQuery} from '@tanstack/react-query'
import {Text, Button, Icon, makeStyles} from '@rneui/themed'
import {ActivityIndicator, ScrollView, View} from 'react-native'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import InfoMessage from '@core/InfoMessage'
import ContainContainer from '@core/ContentContainer'

import {cacheKey} from 'api'
import Logo from 'components/Logo'
import useApi from 'hooks/api/useApi'
import {EstimateFee} from 'api/Response'
import {PaymentProps} from 'api/Request'
import {useDebounce, useAssets} from 'hooks/helper'

import TierOverviewModal from './TierFeesModal'
import FiatPaymentModal from './FiatPayment/FiatPayment'

type BuyBoxFields = {
  amount: string
  total: string
}

const BuyToken = () => {
  const api = useApi()
  const styles = useStyles()
  const {data: bwgLimit} = useAssets('BWG')
  const methods = useForm<BuyBoxFields>()
  const {total} = methods.getValues()
  const [inBase, setInBase] = useState<boolean>(false)
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [isFiatModalOpened, setIsFiatModalOpened] = useState<boolean>(false)

  const {
    mutate,
    isLoading,
    data: estimateFees,
  } = useMutation<EstimateFee, unknown, Partial<PaymentProps>>({
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

  const {data: paymentService} = useQuery({
    queryFn: api.checkPaymentService,
    queryKey: [cacheKey.checkPaymentService],
    initialData: () => ({status: 'enabled', success: false}),
    refetchInterval: 3000,
  })

  const isActiveService = React.useMemo<boolean | undefined>(
    () => paymentService && paymentService.status === 'enabled',
    [paymentService]
  )

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
          <Text h3 h3Style={{marginTop: 20}}>
            Purchase BWG
          </Text>
          {!isActiveService && (
            <InfoMessage
              variant='warning'
              title='Attention'
              message='Payment service currently unavailable'
            />
          )}
          <Form methods={methods} style={{rowGap: 15}}>
            <FormInput
              name='amount'
              label='Amount'
              keyboardType='numeric'
              placeholder='Enter your amount'
              onChangeText={value => onChange(value, true)}
              leftElement={
                <Icon
                  name='dollar'
                  type='font-awesome'
                  size={18}
                  color='white'
                  style={styles.currency}
                />
              }
              rightElement={isLoading && !inBase ? <ActivityIndicator /> : undefined}
              editable={isActiveService}
            />

            <FormInput
              name='total'
              label='Total'
              keyboardType='numeric'
              placeholder='Enter your amount'
              onChangeText={value => onChange(value, false)}
              leftElement={<Logo height={30} width={30} style={{marginRight: 10}} />}
              rightElement={isLoading && inBase ? <ActivityIndicator /> : undefined}
              editable={isActiveService}
            />

            <Text style={styles.tierLink} onPress={() => setIsOpened(true)}>
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

const useStyles = makeStyles(({colors}) => ({
  currency: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#399fff',
    marginRight: 10,
  },
  tierLink: {
    textAlign: 'right',
    color: colors.tertiary,
    marginRight: 5,
    width: 'auto',
  },
}))

export default BuyToken
