import {SVGAttributes} from 'react'
import {TouchableWithoutFeedback} from 'react-native'

import LogoIcon from 'images/bwg-logo.svg'

type LogoProps = SVGAttributes<SVGElement> & {
  onPress?: () => void
}

const Logo = ({height = 40, width = 40, onPress, ...props}: LogoProps) => (
  <TouchableWithoutFeedback onPress={() => onPress && onPress()}>
    <LogoIcon height={height} width={width} {...props} />
  </TouchableWithoutFeedback>
)

export default Logo
