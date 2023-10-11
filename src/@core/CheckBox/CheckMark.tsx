import React from 'react'
import {Path} from 'react-native-svg'
import Animated, {
  DerivedValue,
  useAnimatedProps,
  withTiming,
  useAnimatedRef,
} from 'react-native-reanimated'

type CheckMarkProps = {
  progress: DerivedValue<number>
  color: string
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

const CheckMark: React.FC<CheckMarkProps> = ({progress, color}) => {
  const animatedRef = useAnimatedRef<Path>()
  const [length, setLength] = React.useState<number>(0)

  const checkMarkAnimation = useAnimatedProps(() => {
    const strokeDashoffset = withTiming(length - length * progress.value)
    const opacity = progress.value
    return {strokeDashoffset, opacity}
  })

  return (
    <AnimatedPath
      fill={'none'}
      ref={animatedRef}
      animatedProps={checkMarkAnimation}
      onLayout={() => {
        if (!animatedRef.current) return
        const length = animatedRef.current.getTotalLength()
        if (!length) return
        setLength(length)
      }}
      d='M12 24.4068L20.6667 32.9999L36.5 17.1667'
      stroke={color}
      strokeWidth={5}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeDasharray={length}
    />
  )
}
export default CheckMark
