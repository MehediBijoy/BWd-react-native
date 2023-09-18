import {create} from 'zustand'

interface IState {
  isOpened: boolean
  setIsOpened(value: boolean): void
}

const useWalletController = create<IState>()(set => ({
  isOpened: false,
  setIsOpened: (value: boolean) => set(() => ({isOpened: value})),
}))

export default useWalletController
