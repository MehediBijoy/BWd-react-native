import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IState {
  token?: string
  setToken: (value?: string) => void
}

const useAuthToken = create<IState>()(
  persist(
    set => ({
      token: undefined,
      setToken: (newToken?: string) => set(() => ({token: newToken})),
    }),
    {
      name: 'auth-token',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useAuthToken
