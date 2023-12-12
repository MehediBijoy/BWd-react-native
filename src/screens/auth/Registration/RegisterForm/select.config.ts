import {TFunction} from 'i18next'

export const earnConfig = (t: TFunction) => [
  {
    value: '10,000 per year or less',
    label: t('register.signup.earnConfig.option1'),
  },
  {
    value: 'between 20,000 to 30,000 per year',
    label: t('register.signup.earnConfig.option2'),
  },
  {
    value: 'between 30,000 to 40,000 per year',
    label: t('register.signup.earnConfig.option3'),
  },
  {
    value: 'between 40,000 to 50,000 per year',
    label: t('register.signup.earnConfig.option4'),
  },
  {
    value: 'between 50,000 to 60,000 per year',
    label: t('register.signup.earnConfig.option5'),
  },
  {
    value: 'between 60,000 to 70,000 per year',
    label: t('register.signup.earnConfig.option6'),
  },
  {
    value: 'between 70,000 to 80,000 per year',
    label: t('register.signup.earnConfig.option7'),
  },
  {
    value: 'between 80,000 to 90,000 per year',
    label: t('register.signup.earnConfig.option8'),
  },
  {
    value: 'between 90,000 to 100,000 per year',
    label: t('register.signup.earnConfig.option9'),
  },
  {
    value: '100,000 per year or more',
    label: t('register.signup.earnConfig.option10'),
  },
]

export const professionConfig = (t: TFunction) => [
  {
    value: 'self employed',
    label: t('register.signup.professionConfig.option1'),
  },
  {
    value: 'businessman',
    label: t('register.signup.professionConfig.option2'),
  },
  {
    value: 'working in finance',
    label: t('register.signup.professionConfig.option3'),
  },
  {
    value: 'working in it',
    label: t('register.signup.professionConfig.option4'),
  },
  {
    value: 'working as a craftsman',
    label: t('register.signup.professionConfig.option5'),
  },
  {
    value: 'office worker',
    label: t('register.signup.professionConfig.option6'),
  },
  {
    value: 'medical profession',
    label: t('register.signup.professionConfig.option7'),
  },
  {
    value: 'research / science',
    label: t('register.signup.professionConfig.option8'),
  },
  {
    value: 'automotive',
    label: t('register.signup.professionConfig.option9'),
  },
  {
    value: 'other',
    label: t('register.signup.professionConfig.option10'),
  },
]

export const experienceConfig = (t: TFunction) => [
  {
    value: 'no experience',
    label: t('register.signup.experienceConfig.option1'),
  },
  {
    value: 'some prior experience in trading / investing',
    label: t('register.signup.experienceConfig.option2'),
  },
  {
    value: 'experienced trader',
    label: t('register.signup.experienceConfig.option3'),
  },
]

export const sourceOfIncomeConfig = (t: TFunction) => [
  {
    value: 'salary',
    label: t('register.signup.sourceOfIncomeConfig.option1'),
  },
  {
    value: 'investment',
    label: t('register.signup.sourceOfIncomeConfig.option2'),
  },
  {
    value: 'pensions',
    label: t('register.signup.sourceOfIncomeConfig.option3'),
  },
  {
    value: 'business',
    label: t('register.signup.sourceOfIncomeConfig.option4'),
  },
  {
    value: 'Others',
    label: t('register.signup.sourceOfIncomeConfig.option5'),
  },
]

export const beneficialOwnerConfig = (t: TFunction) => [
  {
    value: 'yes',
    label: t('register.signup.ownerLabel1'),
  },
  {
    value: 'no',
    label: t('register.signup.ownerLabel2'),
  },
]
