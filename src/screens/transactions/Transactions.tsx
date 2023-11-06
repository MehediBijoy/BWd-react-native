import React from 'react'
import {Text} from '@rneui/themed'
import {useTranslation} from 'react-i18next'
import {ScrollView, View} from 'react-native'

import ContainContainer from '@core/ContentContainer'

import TransactionsHistory from './TransactionsHistory'

const Transactions = () => {
  const {t} = useTranslation()
  return (
    <ScrollView>
      <ContainContainer>
        <View style={{marginTop: 20}}>
          <Text h3>{t('navigation.items.trade')}</Text>
          <TransactionsHistory />
        </View>
      </ContainContainer>
    </ScrollView>
  )
}

export default Transactions
