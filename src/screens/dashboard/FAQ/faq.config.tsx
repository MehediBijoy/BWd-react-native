import {Text} from '@rneui/themed'

const connectionReason = [
  'If you are having trouble connecting your wallet, either not being redirected back from the wallet to our application or not getting the connection dialogue please try the following steps. \n',
  '1. Close the Bretton Woods Gold app and open it again, then try to connect your wallet again \n',
  '2. If that did not resolve it please try closing the app and wallet and try to connect again \n',
  '3.If you are facing persistent issues and the steps above did not resolve it, please contact our support and supply the details of your error, wallet of choice and phone, to receive personalised support',
]

export const config = [
  {
    id: 1,
    title: 'What happens when I make a purchase?',
    description:
      'To make a purchase, you first need a connected wallet on our platform so that we have a place to send the purchased tokens. Once you complete a FIAT purchase, we wait for the payment to clear and immediately transfer the tokens to your connected wallet. You will receive a notification on the platform that we have received your payment and that we have transferred the tokens to your wallet. Depending on the activity on the blockchain, it may take a few minutes for the funds to arrive in your wallet, as blockchain transaction times vary depending on the workload and time of day. Please allow at least half an hour before worrying about a failed transfer.',
  },
  {
    id: 2,
    title: 'What are the gold storage costs and how does the deduction work?',
    description:
      'The deposited gold of the BWG token is securely stored in Switzerland. This security and guarantee generate costs. Therefore, each token with the gold deposited will participate in the costs in advance every quarter in an automated process.Because the price of gold is always volatile and the cost of storage changes over time, we reserve the right to adjust prices accordingly. Customers will be notified of price adjustments in advance. If the customer has afterward charged too much, then a cashback event will be held on our platform,where loaded wallets can be registered and the overpaid costs will be refunded to the customers.',
  },
  {
    id: 3,
    title: 'How do I pay with Crypto tokens?',
    description:
      'Currently, payment with cryptocurrencies is not possible. As soon as we receive regulatory permission, we will accept common stablecoins. To pay with crypto tokens, you need to have BNB in your wallet to pay blockchain transfer fees for a transaction as well as the stablecoin you mean to pay with.',
  },
  {
    id: 4,
    title: 'I am having trouble connecting my wallet',
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
