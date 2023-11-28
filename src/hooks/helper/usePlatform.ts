import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {useCurrency} from 'hooks/states'
import {EU_API_URL, US_API_URL, EU_APP_URL, US_APP_URL} from 'config/environments'

export type PlatformType = 'EU' | 'US'

interface IState {
  platform: PlatformType
  API_URL: string
  APP_URL: string
  hasHydrate: boolean
  switchPlatform: (type: PlatformType) => void
}

const usePlatform = create<IState>()(
  persist(
    set => ({
      platform: 'US',
      API_URL: US_API_URL,
      APP_URL: US_APP_URL,
      hasHydrate: false,
      switchPlatform: type => {
        if (type === 'US') useCurrency.setState({currency: 'USD'})
        return set(() => ({
          platform: type,
          API_URL: type === 'EU' ? EU_API_URL : US_API_URL,
          APP_URL: type === 'EU' ? EU_APP_URL : US_APP_URL,
        }))
      },
    }),
    {
      name: 'platform',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        usePlatform.setState({hasHydrate: true})
        if (state?.platform === 'US') {
          useCurrency.setState({currency: 'USD'})
        }
      },
    }
  )
)

export default usePlatform
