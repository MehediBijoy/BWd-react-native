import {Text} from '@rneui/themed'
import {TFunction} from 'i18next'

const connectionReason = [
  'If you are having trouble connecting your wallet, either not being redirected back from the wallet to our application or not getting the connection dialogue please try the following steps. \n',
  '1. Close the Bretton Woods Gold app and open it again, then try to connect your wallet again. \n',
  '2. If that did not resolve it please try closing the app and wallet and try to connect again. \n',
  '3. If you are facing persistent issues and the steps above did not resolve it, please contact our support and supply the details of your error, wallet of choice and phone, to receive personalized support.',
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
        {connectionReason.map((item, index) => (
          <Text key={index} style={{lineHeight: 20}}>
            {item}
          </Text>
        ))}
      </>
    ),
  },
]
