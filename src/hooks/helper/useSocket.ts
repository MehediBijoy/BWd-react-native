import React from 'react'
import {createConsumer, Subscription} from '@rails/actioncable'

import {useAuthToken} from '../api'
import usePlatform from './usePlatform'

type ChannelProps = 'PaymentsChannel' | 'TransfersChannel' | 'NotificationsChannel'

type CallbackProps = {
  connected?(): void
  disconnected?(): void
  initialized?(): void
  received?(data: unknown): void
}

// Event listeners required for @rails/actioncable

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
// eslint-disable-next-line no-empty-function
global.addEventListener = () => {}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
// eslint-disable-next-line no-empty-function
global.removeEventListener = () => {}

const useSocket = () => {
  const {API_URL} = usePlatform()
  const {token} = useAuthToken()
  const channelRef = React.useRef<Subscription>()

  const actionCable = React.useMemo(() => {
    const url =
      token && `${API_URL.replace('http', 'ws')}/cable?token=${token.split(' ').pop()}&scope=user`
    return createConsumer(url)
  }, [API_URL, token])

  const subscribe = React.useCallback(
    (channelName: ChannelProps, callback: CallbackProps) => {
      const channel = actionCable.subscriptions.create(channelName, {
        initialized() {
          callback.initialized && callback.initialized()
        },
        connected() {
          callback.connected && callback.connected()
        },
        received<TData>(data: TData) {
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
  React.useEffect(() => () => actionCable.disconnect(), [actionCable])

  return {subscribe, unsubscribe}
}

export default useSocket
