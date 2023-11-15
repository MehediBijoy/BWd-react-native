import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IState {
  token?: string
  hasHydrate: boolean
  setToken: (value?: string) => void
}

const useAuthToken = create<IState>()(
  persist(
    set => ({
      token: undefined,
      hasHydrate: false,
      setToken: (newToken?: string) => set(() => ({token: newToken})),
    }),
    {
      name: 'auth-token',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => () => {
        useAuthToken.setState({hasHydrate: true})
      },
    }
  )
)

export default useAuthToken
