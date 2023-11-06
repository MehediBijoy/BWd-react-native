import {Text} from '@rneui/themed'
import {TFunction} from 'i18next'

const connectionReason = (t: TFunction) => [
  t('faq.dashboard.description6.text1'),
  t('faq.dashboard.description6.text2'),
  t('faq.dashboard.description6.text3'),
  t('faq.dashboard.description6.text4'),
]

export const config = (t: TFunction) => [
  {
    id: 1,
    title: t('faq.dashboard.title3'),
    description: t('faq.dashboard.description3'),
  },
  {
    id: 2,
    title: t('faq.dashboard.title4'),
    description: t('faq.dashboard.description4'),
  },
  {
    id: 3,
    title: t('faq.dashboard.title5'),
    description: t('faq.dashboard.description5'),
  },
  {
    id: 4,
    title: t('faq.dashboard.title2'),
    description: (
      <>
        {connectionReason(t).map((item, index) => (
          <Text key={index} style={{lineHeight: 20}}>
            {item}
          </Text>
        ))}
      </>
    ),
  },
]
