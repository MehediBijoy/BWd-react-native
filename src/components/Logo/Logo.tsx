import {SVGAttributes} from 'react'

import LogoIcon from 'images/bwg-logo.svg'

type LogoProps = SVGAttributes<SVGElement>

const Logo = ({height = 40, width = 40, ...props}: LogoProps) => (
  <LogoIcon height={height} width={width} {...props} />
)

export default Logo
