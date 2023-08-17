import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IState {
  token: string | undefined
  setToken: (value: string) => void
}

export const useAuthToken = create<IState>()(
  persist(
    set => ({
      token: undefined,
      setToken: (newToken?: string) => set(() => ({token: newToken})),
    }),
    {
      name: 'auth-token',
      getStorage: () => AsyncStorage,
    }
  )
)
