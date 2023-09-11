import React from 'react'
import {ScrollView} from 'react-native'

import Switch from '@core/Switch'
import ContainContainer from '@core/ContentContainer'

import {useSocket} from 'hooks/helper'

import BalanceBox from './balanceBox'

const Dashboard = () => {
  const {subscribe} = useSocket()
  const [enabled, setEnabled] = React.useState(false)

  React.useEffect(() => {
    subscribe('NotificationsChannel', {
      received(data) {
        console.log(data)
      },
      connected() {
        console.log('connected')
      },
      disconnected() {
        console.log('disconnected')
      },
    })
  }, [])

  return (
    <ScrollView>
      <ContainContainer>
        <BalanceBox />
        <Switch active={enabled} onChange={() => setEnabled(!enabled)} />
      </ContainContainer>
    </ScrollView>
  )
}

export default Dashboard
