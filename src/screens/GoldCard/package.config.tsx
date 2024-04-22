import {Image} from '@rneui/themed'
import {TFunction} from 'i18next'

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

export interface Benefits {
  [key: string]: Benefit[]
}

export const benefits: (t: TFunction) => Benefits = (t: TFunction) => ({
  signature: [
    {
      icon: <FeeSvg width={30} height={30} />,
      title: t('goldCard.benefit.signature.title1'),
      description: t('goldCard.benefit.signature.description1'),
    },
    {
      icon: <TokenSvg width={30} height={30} />,
      title: t('goldCard.benefit.signature.title2'),
      description: t('goldCard.benefit.signature.description2'),
    },
    {
      icon: <BenefitsSvg width={30} height={30} />,
      title: t('goldCard.benefit.signature.title3'),
      description: t('goldCard.benefit.signature.description3'),
    },
  ],
  premium: [
    {
      icon: <FeeSvg width={30} height={30} />,
      title: t('goldCard.benefit.premium.title1'),
      description: t('goldCard.benefit.premium.description1'),
    },
    {
      icon: <TokenSvg width={30} height={30} />,
      title: t('goldCard.benefit.premium.title2'),
      description: t('goldCard.benefit.premium.description2'),
    },
    {
      icon: <BenefitsSvg width={30} height={30} />,
      title: t('goldCard.benefit.premium.title3'),
      description: t('goldCard.benefit.premium.description3'),
    },
  ],
  standard: [
    {
      icon: <FeeSvg width={30} height={30} />,
      title: t('goldCard.benefit.standard.title1'),
      description: t('goldCard.benefit.standard.description1'),
    },
    {
      icon: <TokenSvg width={30} height={30} />,
      title: t('goldCard.benefit.standard.title2'),
      description: t('goldCard.benefit.standard.description2'),
    },
    {
      icon: <BenefitsSvg width={30} height={30} />,
      title: t('goldCard.benefit.standard.title3'),
      description: t('goldCard.benefit.standard.description3'),
    },
  ],
})

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

export const IsCountryWhiteList = (country: string) => {
  const countryList = [
    'LIE',
    'DEU',
    'AUT',
    'NLD',
    'BEL',
    'LUX',
    'IRL',
    'GBR',
    'FRA',
    'ESP',
    'ITA',
    'CHE',
  ]

  return !countryList.includes(country)
}
