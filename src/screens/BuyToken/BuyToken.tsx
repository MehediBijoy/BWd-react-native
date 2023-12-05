import {useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import React, {useMemo, useState} from 'react'
import {useMutation, useQuery} from '@tanstack/react-query'
import {Text, Button, Icon, makeStyles} from '@rneui/themed'
import {ActivityIndicator, ScrollView, TouchableWithoutFeedback, View} from 'react-native'

import Form from '@core/Form'
import FormInput from '@core/FormInput'
import InfoMessage from '@core/InfoMessage'
import ContainContainer from '@core/ContentContainer'

import {alpha} from 'utils'
import {cacheKey} from 'api'
import Logo from 'components/Logo'
import useApi from 'hooks/api/useApi'
import {EstimateFee} from 'api/Response'
import {PaymentProps} from 'api/Request'
import {useCurrency} from 'hooks/states'
import {AllCurrencyType} from 'constants/currency.config'
import {useDebounce, useAssets, usePlatform} from 'hooks/helper'

import TierOverviewModal from './TierFeesModal'
import FiatPaymentModal from './FiatPayment/FiatPayment'
import CurrencySelect from './CurrencySelector/CurrencySelector'
import {getCurrencyConfig} from './currencySelector.config'

type BuyBoxFields = {
  amount: string
  total: string
}

type currencyType = {
  id: AllCurrencyType
  label: string
  icon: JSX.Element
}

const BuyToken = () => {
  const api = useApi()
  const styles = useStyles()
  const {t} = useTranslation()
  const {currency} = useCurrency()
  const {platform} = usePlatform()
  const {data: bwgLimit} = useAssets('BWG')
  const methods = useForm<BuyBoxFields>()
  const {total} = methods.getValues()
  const [inBase, setInBase] = useState<boolean>(false)
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [isFiatModalOpened, setIsFiatModalOpened] = useState<boolean>(false)
  const [isOpenedCurrency, setIsOpenedCurrency] = useState<boolean>(false)
  const [defaultCurrency, setDefaultCurrency] = useState<AllCurrencyType>(currency)

  const currencyConfig = getCurrencyConfig(platform)

  const selectedCurrency: currencyType = useMemo(
    () => currencyConfig.find(item => item.id === defaultCurrency),
    [currencyConfig, defaultCurrency]
  )

  const {
    mutate,
    isLoading,
    data: estimateFees,
  } = useMutation<EstimateFee, unknown, Partial<PaymentProps>>({
    mutationFn: ({amount, in_base}) =>
      api.getEstimateFee({
        asset: selectedCurrency.id,
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

        <View style={{display: 'flex', rowGap: 20}}>
          <Text h3 h3Style={{marginTop: 20}}>
            {t('dashboard.buy.title', {token: 'BWG'})}
          </Text>
          {!isActiveService && (
            <InfoMessage
              variant='warning'
              title='Attention'
              message='Payment service currently unavailable'
            />
          )}

          <TouchableWithoutFeedback onPress={() => setIsOpenedCurrency(true)}>
            <View style={styles.selectContainer}>
              <View style={styles.selectLeft}>
                {selectedCurrency?.icon}
                <Text style={styles.currencyText}>{selectedCurrency?.label}</Text>
              </View>
              <View>
                {isOpenedCurrency ? (
                  <Icon name='chevron-thin-up' type='entypo' size={20} color='#787878' />
                ) : (
                  <Icon name='chevron-thin-down' type='entypo' size={20} color='#787878' />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>

          <Form methods={methods} style={{rowGap: 15}}>
            <FormInput
              name='amount'
              label={t('dashboard.availableBalance.amount')}
              keyboardType='numeric'
              placeholder={t('dashboard.buy.enterAmount')}
              onChangeText={value => onChange(value, true)}
              leftElement={selectedCurrency?.icon}
              editable={isActiveService}
            />

            <FormInput
              name='total'
              label={t('dashboard.availableBalance.total')}
              keyboardType='numeric'
              placeholder={t('dashboard.buy.enterAmount')}
              onChangeText={value => onChange(value, false)}
              leftElement={<Logo height={30} width={30} style={{marginRight: 10}} />}
              rightElement={isLoading ? <ActivityIndicator /> : undefined}
              editable={isActiveService}
            />

            <Text style={styles.tierLink} onPress={() => setIsOpened(true)}>
              {t('dashboard.buy.tierSystem.part1')} {t('dashboard.buy.tierSystem.part2')}
            </Text>
            <Button
              title={t('dashboard.buy.btnText', {tokenName: 'BWG'})}
              disabled={!isValid}
              onPress={() => setIsFiatModalOpened(true)}
            />
          </Form>
        </View>
      </ContainContainer>
      <CurrencySelect
        isOpened={isOpenedCurrency}
        onClose={() => setIsOpenedCurrency(false)}
        onPress={setDefaultCurrency}
      />
      <FiatPaymentModal
        isOpened={isFiatModalOpened}
        onClose={() => setIsFiatModalOpened(false)}
        estimateFees={estimateFees as EstimateFee}
        in_base={inBase}
      />
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
    backgroundColor: '#389FFF',
    marginRight: 10,
  },
  tierLink: {
    textAlign: 'right',
    color: colors.tertiary,
    marginRight: 5,
    width: 'auto',
  },
  selectContainer: {
    height: 45,
    borderColor: alpha(colors.divider, 0.5),
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  selectLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 10,
  },
  currencyText: {
    fontSize: 14,
    fontWeight: '800',
  },
}))

export default BuyToken
