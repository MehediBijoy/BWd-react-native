import {useMemo, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useMutation} from '@tanstack/react-query'
import {Text, Button, Icon, makeStyles} from '@rneui/themed'
import {ActivityIndicator, ScrollView, View} from 'react-native'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import ContainContainer from '@core/ContentContainer'

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
  const {t} = useTranslation()
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
            {t('dashboard.buy.title', {token: 'BWG'})}
          </Text>

          <Form methods={methods} style={{rowGap: 15}}>
            <FormInput
              name='amount'
              label={t('dashboard.availableBalance.amount')}
              keyboardType='numeric'
              placeholder={t('dashboard.buy.enterAmount')}
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
            />

            <FormInput
              name='total'
              label={t('dashboard.availableBalance.total')}
              keyboardType='numeric'
              placeholder={t('dashboard.buy.enterAmount')}
              onChangeText={value => onChange(value, false)}
              leftElement={<Logo height={30} width={30} style={{marginRight: 10}} />}
              rightElement={isLoading && inBase ? <ActivityIndicator /> : undefined}
            />

            <Text style={styles.tierLink} onPress={() => setIsOpened(true)}>
              {t('dashboard.buy.tierSystem.part1')} {t('dashboard.buy.tierSystem.part2')}
            </Text>
            <Button
              title={t('dashboard.buy.btnText', {tokenName: 'BWG'})}
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
