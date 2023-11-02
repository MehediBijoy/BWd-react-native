import {TFunction} from 'i18next'

export const switchConfig = [
  {
    id: 'USD',
    label: 'USD',
  },
  {
    id: 'EUR',
    label: 'EUR',
  },
]

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
