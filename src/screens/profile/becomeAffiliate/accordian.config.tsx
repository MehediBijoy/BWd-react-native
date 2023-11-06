import {Text} from '@rneui/themed'
import {TFunction} from 'i18next'

export const howItWorks = (t: TFunction) => [
  {
    id: 1,
    title: t('faq.convertAffiliate.howItWorks.title1'),
    description: t('faq.convertAffiliate.howItWorks.description1'),
  },
  {
    id: 2,
    title: t('faq.convertAffiliate.howItWorks.title2'),
    description: t('faq.convertAffiliate.howItWorks.description2'),
  },
  {
    id: 3,
    title: t('faq.convertAffiliate.howItWorks.title3'),
    description: t('faq.convertAffiliate.howItWorks.description3'),
  },
]

export const benefitsConfig = (t: TFunction) => [
  {
    id: 1,
    title: t('faq.convertAffiliate.benefitsConfig.title1'),
    description: t('faq.convertAffiliate.benefitsConfig.description1'),
  },
  {
    id: 2,
    title: t('faq.convertAffiliate.benefitsConfig.title2'),
    description: t('faq.convertAffiliate.benefitsConfig.description2'),
  },
  {
    id: 3,
    title: t('faq.convertAffiliate.benefitsConfig.title3'),
    description: t('faq.convertAffiliate.benefitsConfig.description3'),
  },
  {
    id: 4,
    title: t('faq.convertAffiliate.benefitsConfig.title4'),
    description: t('faq.convertAffiliate.benefitsConfig.description4'),
  },
  {
    id: 5,
    title: t('faq.convertAffiliate.benefitsConfig.title5'),
    description: t('faq.convertAffiliate.benefitsConfig.description5'),
  },
]

// const poolArray = [
//   '1. Dynamic Compression Pool - Requires 5 Personal Tokens sales in one calendar month to qualify \n',
//   '2. Infinity Bonus Pool - 10% of CV collected \n',
//   '3. Performer Bonus Pool - 10% of CV collected \n',
//   '4. Global Leaders Bonus Pool - 10% of CV collected\n',
//   '5. Incentive Pool - 10% of CV collected - From this special incentives and prizes can be won\n',
//   '6. Success builder Bonus Pool - 3% of CV collected\n',
//   '7. Charity Pool - 1% of CV collected - Affiliates give back! This goes to a charity to support a good cause\n',
// ]

const poolArray = (t: TFunction) => [
  t('faq.convertAffiliate.poolConfig.poolArray.line1'),
  t('faq.convertAffiliate.poolConfig.poolArray.line2'),
  t('faq.convertAffiliate.poolConfig.poolArray.line3'),
  t('faq.convertAffiliate.poolConfig.poolArray.line4'),
  t('faq.convertAffiliate.poolConfig.poolArray.line5'),
  t('faq.convertAffiliate.poolConfig.poolArray.line6'),
  t('faq.convertAffiliate.poolConfig.poolArray.line7'),
]

export const poolConfig = (t: TFunction) => [
  {
    id: 1,
    title: t('faq.convertAffiliate.poolConfig.title1'),
    description: t('faq.convertAffiliate.poolConfig.description1'),
  },
  {
    id: 2,
    title: t('faq.convertAffiliate.poolConfig.title2'),
    description: (
      <Text style={{rowGap: 20}}>
        {poolArray(t).map((item, index) => (
          <Text key={index} style={{flexShrink: 1, flexWrap: 'wrap'}}>
            {item}
          </Text>
        ))}
      </Text>
    ),
  },
]
