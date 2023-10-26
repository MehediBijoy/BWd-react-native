import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

import i18n, {languages} from 'i18n'

interface IState {
  currentLang: string
  defaultLang: string
  hasHydrate: boolean
  availableLang: readonly string[]
  onChange: (lang: string) => void
}

const useLocales = create<IState>()(
  persist(
    set => ({
      currentLang: languages[0],
      defaultLang: languages[0],
      availableLang: languages,
      hasHydrate: false,
      onChange: lang => {
        i18n.changeLanguage(lang)
        return set(states => ({...states, currentLang: lang}))
      },
    }),
    {
      name: 'local-lang',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        useLocales.setState({hasHydrate: true})
        i18n.changeLanguage(state?.currentLang)
      },
    }
  )
)

export default useLocales
