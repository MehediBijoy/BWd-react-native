import {TFunction} from 'i18next'

export const getSurveyQuestions = (t: TFunction) => [
  {
    label: t('survey.label1'),
    value: 'up to $500',
  },
  {
    label: t('survey.label2'),
    value: 'up to $1000',
  },
  {
    label: t('survey.label3'),
    value: 'up to $2000',
  },
  {
    label: t('survey.label4'),
    value: 'more than $2000',
  },
]
