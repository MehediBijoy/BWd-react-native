import dayjs from 'dayjs'
import {setLocale} from 'yup'
import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'

// import all supports language for dayjs
import 'dayjs/locale/de'
import 'dayjs/locale/en'

import yupLocale from './yupLocaleOptions'
// general translation
import en from '../../locales/lang/en.json'
import de from '../../locales/lang/de.json'
// yup translation
import yupEn from '../../locales/yup/en.json'
import yupDe from '../../locales/yup/de.json'

export const languages = ['en', 'de'] as const
export type LanguageTypes = (typeof languages)[number]

const defaultLang = languages[0]

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: defaultLang,
  fallbackLng: defaultLang,
  resources: {
    en: {translation: {...en, yup: yupEn}},
    de: {translation: {...de, yup: yupDe}},
  },
})

setLocale(yupLocale())
i18next.on('languageChanged', (lang: LanguageTypes) => {
  dayjs.locale(lang)
})

export default i18next
