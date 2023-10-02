import React from 'react'
import {Path} from 'react-native-svg'
import Animated, {
  DerivedValue,
  interpolateColor,
  useAnimatedProps,
  createAnimatedPropAdapter,
  processColor,
} from 'react-native-reanimated'

type AnimatedCheckBoxProps = {
  progress: DerivedValue<number>
  uncheckedColor: string
  checkedColor: string
  unCheckedBorderColor: string
}

const adapter = createAnimatedPropAdapter(
  props => {
    if (Object.keys(props).includes('fill')) {
      props.fill = {type: 0, payload: processColor(props.fill)}
    }
    if (Object.keys(props).includes('stroke')) {
      props.stroke = {type: 0, payload: processColor(props.stroke)}
    }
  },
  ['fill', 'stroke']
)

const AnimatedPath = Animated.createAnimatedComponent(Path)

const AnimatedCheckBox: React.FC<AnimatedCheckBoxProps> = ({
  progress,
  uncheckedColor,
  checkedColor,
  unCheckedBorderColor,
}) => {
  const animation = useAnimatedProps(
    () => {
      const fill = interpolateColor(progress.value, [0, 1], [uncheckedColor, checkedColor])
      const stroke = interpolateColor(progress.value, [0, 1], [unCheckedBorderColor, checkedColor])
      return {fill, stroke}
    },
    [unCheckedBorderColor],
    adapter
  )

  return (
    <AnimatedPath
      animatedProps={animation}
      d='M2 16C2 8.26801 8.26801 2 16 2H33C40.732 2 47 8.26801 47 16V33C47 40.732 40.732 47 33 47H16C8.26801 47 2 40.732 2 33V16Z'
      strokeWidth={4}
    />
  )
}

export default AnimatedCheckBox
