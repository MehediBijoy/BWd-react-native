import {useTranslation} from 'react-i18next'

import {YupMessageFormat} from 'i18n/yupLocaleOptions'

const useYupLocaleFormat = () => {
  const {t} = useTranslation()

  const translate = (params?: YupMessageFormat | string) => {
    if (!params) return
    if (typeof params === 'string') return t(params)

    return t(params.key, {...params?.values})
  }

  return {t: translate}
}

export default useYupLocaleFormat
