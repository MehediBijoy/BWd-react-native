import {Image} from '@rneui/themed'

import SignatureImg from 'images/goldcard/signature.png'
import StandardImg from 'images/goldcard/standard.png'
import PremiumImg from 'images/goldcard/premium.png'
import FeeSvg from 'images/goldcard/fees.svg'
import TokenSvg from 'images/goldcard/Token.svg'
import BenefitsSvg from 'images/goldcard/Benefits.svg'

interface Benefit {
  icon: JSX.Element
  title: string
  description: string
}

interface Benefits {
  [key: string]: Benefit[]
}

export const benefits: Benefits = {
  signature: [
    {
      icon: <FeeSvg width={30} height={30} />,
      title: 'Gold card maximum benefit',
      description: 'Enjoy our gold card with maximum benefit',
    },
    {
      icon: <TokenSvg width={30} height={30} />,
      title: 'Get 10 BWG tokens',
      description: 'Get 10 BEG token with gold card',
    },
    {
      icon: <BenefitsSvg width={30} height={30} />,
      title: 'Reduced fees',
      description: 'Enjoy tier 4 fees (4.99%)',
    },
  ],
  premium: [
    {
      icon: <FeeSvg width={30} height={30} />,
      title: 'Gold card standard benefit',
      description: 'Enjoy our gold card with standard benefit',
    },
    {
      icon: <TokenSvg width={30} height={30} />,
      title: 'Get 5 BWG tokens',
      description: 'Get 5 BEG token with gold card',
    },
    {
      icon: <BenefitsSvg width={30} height={30} />,
      title: 'Reduced fees',
      description: 'Enjoy tier 3 fees (8.99%)',
    },
  ],
  standard: [
    {
      icon: <BenefitsSvg width={30} height={30} />,
      title: 'Gold card service',
      description: 'Enjoy our gold card ',
    },
  ],
}

interface PackageImages {
  [key: string]: JSX.Element
}

export const packageImages: PackageImages = {
  signature: (
    <Image source={SignatureImg} style={{width: '100%', height: 200}} resizeMode='contain' />
  ),
  premium: <Image source={PremiumImg} style={{width: '100%', height: 200}} resizeMode='contain' />,
  standard: (
    <Image source={StandardImg} style={{width: '100%', height: 200}} resizeMode='contain' />
  ),
}
