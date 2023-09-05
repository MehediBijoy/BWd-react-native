import React from 'react'
import {createConsumer, Subscription} from '@rails/actioncable'

import {BASE_URL} from 'config/environments'

import {useAuthToken} from '../api'

type ChannelProps = 'PaymentsChannel' | 'TransfersChannel' | 'NotificationsChannel'

type CallbackProps = {
  connected?(): void
  disconnected?(): void
  initialized?(): void
  received?(data: any): void
}

// this event listener required for @rails/actioncable
global.addEventListener = () => {}
global.removeEventListener = () => {}

const useSocket = () => {
  const {token} = useAuthToken()
  const channelRef = React.useRef<Subscription>()

  const actionCable = React.useMemo(() => {
    const url =
      token && `${BASE_URL.replace('http', 'ws')}/cable?token=${token.split(' ').pop()}&scope=user`
    return createConsumer(url)
  }, [])

  const subscribe = React.useCallback(
    (channelName: ChannelProps, callback: CallbackProps) => {
      const channel = actionCable.subscriptions.create(channelName, {
        initialized() {
          callback.initialized && callback.initialized()
        },
        connected() {
          callback.connected && callback.connected()
        },
        received(data) {
          callback.received && callback.received(data)
        },
        disconnected() {
          callback.disconnected && callback.disconnected()
        },
      })
      channelRef.current = channel
    },
    [actionCable]
  )

  const unsubscribe = React.useCallback(
    () => channelRef.current && channelRef.current.unsubscribe(),
    [channelRef]
  )

  // disconnect action cable when
  // unmount component/screen
  React.useEffect(() => {
    return () => actionCable.disconnect()
  }, [])

  return {subscribe, unsubscribe}
}

export default useSocket
