import {create} from 'zustand'
import {IProvider} from '@walletconnect/modal-react-native'

interface ChainId {
  chainId?: number
  isSubscribed: boolean
  setChainId: (id: string) => void
  subscribe: (provider?: IProvider) => void
  unsubscribe: (provider?: IProvider) => void
}

const useChainId = create<ChainId>()((set, get) => ({
  isSubscribed: false,
  setChainId: (id: string) => set({...get(), chainId: parseInt(id, 10)}),
  subscribe: async (provider?: IProvider) => {
    if (!provider) return
    if (get().isSubscribed) return

    await provider.request({method: 'eth_chainId'}).then(id => get().setChainId(id as string))
    provider.on('chainChanged', get().setChainId)
    set({...get(), isSubscribed: true})
  },
  unsubscribe: (provider?: IProvider) => {
    if (!provider) return
    if (!get().isSubscribed) return

    provider.off('chainChange', get().setChainId)
    set({...get(), isSubscribed: false})
  },
}))

export default useChainId
