import {TFunction} from 'i18next'

export const languageConfig = (t: TFunction) => [
  {
    id: 'en',
    label: t('profile.appSettings.english'),
  },
  {
    id: 'de',
    label: t('profile.appSettings.german'),
  },
]
