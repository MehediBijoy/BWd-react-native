import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IState {
  surveyState: string
  hasCompleted: (id: number, platform: string) => boolean
  surveyMutate: (id: number, platform: string) => void
}
// const platform = usePlatform.getState().platform

const _hasCompleted = (id: number, values: string, platform: string): boolean => {
  const persistValue = JSON.parse(values)
  return Boolean(persistValue[platform]?.[id])
}

const useSurvey = create<IState>()(
  persist(
    (set, get) => ({
      surveyState: '{}',
      hasCompleted: (id, platform) => _hasCompleted(id, get().surveyState, platform),
      surveyMutate: (id, platform) => {
        const value = JSON.parse(get().surveyState)

        return set({
          surveyState: JSON.stringify({
            ...value,
            [platform]: {
              ...value[platform],
              [id]: true,
            },
          }),
        })
      },
    }),
    {
      name: 'survey',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useSurvey
