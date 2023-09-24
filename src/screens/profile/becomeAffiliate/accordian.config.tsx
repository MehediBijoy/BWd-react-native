import {Text} from '@rneui/themed'

export const howItWorks = [
  {
    id: 1,
    title: 'Invitation via Link or Referral Code',
    description:
      'As an affiliate, you will receive a unique invitation link and referral code that you can share with potential users. By using your link or code, these new users will be associated with your affiliate account, ensuring that you receive commissions for their actions.',
  },
  {
    id: 2,
    title: 'Direct Commission of 20% of Fees',
    description:
      'When a user, invited through your link or code, purchases BWG Tokens, you will earn a direct commission of 20% of the fees generated from their transaction. This commission is a reflection of the value you bring to our platform by introducing new users who engage with our products.',
  },
  {
    id: 3,
    title: 'Uni-Level Commission of 4%',
    description:
      'The benefits of our affiliate system extend beyond just your direct referrals. If the new user you invited also becomes an affiliate and invites further users who purchase BWG Tokens, you will receive a Uni-Level Commission of 4% from their transactions. This Uni-Level Commission ensures that you continue to earn passive income from the activities of affiliates within your referral network.',
  },
]

export const benefitsConfig = [
  {
    id: 1,
    title: 'Free to Join, No Monthly Costs',
    description:
      "At Bretton Woods AG, we believe in empowering our affiliates. That's why we offer a completely free membership with no hidden monthly costs. You can join our affiliate program and start earning without any financial commitments. It's a risk-free opportunity to explore your earning potential!",
  },
  {
    id: 2,
    title: 'Flexible Work Schedule and Freedom',
    description:
      "Say goodbye to the constraints of a traditional job! As our affiliate, you have the freedom to work whenever, wherever, and with whomever you want. Whether you're a night owl or an early riser, you can run your affiliate business at your own pace, fitting it seamlessly into your lifestyle. Enjoy the flexibility to work from the comfort of your home or while traveling the world. The choice is yours!",
  },
  {
    id: 3,
    title: 'Be Among the First and Secure Your Passive Income',
    description:
      "Timing is everything, and joining our affiliate program early means you'll be one of the first affiliates to capitalize on this incredible opportunity. As we launch our program, you'll have the chance to establish a strong foundation for your passive income. By promoting our gold-backed products, you'll tap into a lucrative market, setting yourself up for long-term success.",
  },
  {
    id: 4,
    title: 'A Simple Turnkey Business',
    description:
      "With our affiliate program, you'll have a turnkey business at your fingertips. Once you receive your unique affiliate link, you can start sharing it right away. Even before your conversion to an affiliate account is completed, you'll begin receiving the full benefits. We provide you with all the necessary tools and support to maximize your earning potential. It's never been easier to start generating income!",
  },
  {
    id: 5,
    title: 'Ongoing Commission Opportunities',
    description:
      "When you share your affiliate link, your earning potential doesn't stop there. Our affiliate program is designed to reward your efforts over time. Your affiliate link will continue to earn you commissions as more people convert and make purchases. As Bretton Woods AG expands its product offerings and introduces new initiatives, you'll have even more opportunities to earn as an affiliate. Your success is our success!",
  },
]

const poolArray = [
  '1. Dynamic Compression Pool - Requires 5 Personal Tokens sales in one calendar month to qualify \n',
  '2. Infinity Bonus Pool - 10% of CV collected \n',
  '3. Performer Bonus Pool - 10% of CV collected \n',
  '4. Global Leaders Bonus Pool - 10% of CV collected\n',
  '5. Incentive Pool - 10% of CV collected - From this special incentives and prizes can be won\n',
  '6. Success builder Bonus Pool - 3% of CV collected\n',
  '7. Charity Pool - 1% of CV collected - Affiliates give back! This goes to a charity to support a good cause\n',
]

const formateString = (array: any[]) =>
  array.map((item, index) => (
    <Text style={{lineHeight: 20}} key={index}>
      {item}
    </Text>
  ))

export const poolConfig = [
  {
    id: 1,
    title: 'Pool Payouts',
    description:
      'The pools are paid out on a monthly basis. If no one is in the pool the collected funds stay there and will be paid out in the next month if anyone has qualified for the pool. Pool shares are divided evenly between the number of qualified users. So if 2 users are assigned to a payout for a pool they each get 50%, in case of 10 users they get 10% each.',
  },
  {
    id: 2,
    title: 'Pool Descriptions',
    description: formateString(poolArray),
  },
]
