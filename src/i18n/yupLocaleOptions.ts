import en from '../../locales/yup/en.json'

export type YupMessageFormat = {
  key: string
  values: object
}

const messageTransform = (key: string, values: object = {}): YupMessageFormat => ({key, values})

const locales: {[key: string]: {[key: string]: (params: object) => YupMessageFormat}} = {}

export default function yupLocale() {
  for (let root in en) {
    locales[root] = {}
    // eslint-disable-next-line
    /* @ts-ignore */
    for (let key in en[root]) {
      locales[root][key] = (params: object) => messageTransform(`yup.${root}.${key}`, params)
    }
  }
  return locales
}
