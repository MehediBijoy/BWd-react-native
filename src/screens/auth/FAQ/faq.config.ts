import {TFunction} from 'i18next'

const config = (t: TFunction) => [
  {
    id: 1,
    title: t('faq.login.title1'),
    description: t('faq.login.description1'),
  },
  {
    id: 2,
    title: t('faq.login.title2'),
    description: t('faq.login.description2'),
  },
  {
    id: 3,
    title: t('faq.login.title3'),
    description: t('faq.login.description3'),
  },
]

export default config
