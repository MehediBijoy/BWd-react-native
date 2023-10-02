import React from 'react'
import {Svg} from 'react-native-svg'
import {Pressable} from 'react-native'
import {Colors, Text, useTheme} from '@rneui/themed'
import {useDerivedValue, withTiming} from 'react-native-reanimated'

import CheckMark from './CheckMark'
import AnimatedCheckBox from './AnimatedCheckBox'

const SIZES = {
  sm: {
    height: 30,
    width: 30,
    fontSize: 16,
  },
  md: {
    height: 35,
    width: 35,
    fontSize: 18,
  },
  lg: {
    height: 40,
    width: 40,
    fontSize: 20,
  },
}

type COLORS = 'default' | 'primary' | 'error'

const getColorNatures = ({colors, nature}: {colors: Colors; nature: COLORS}) =>
  ({
    default: {
      checkMarkColor: colors.textReverse,
      checkedColor: colors.primary,
      uncheckedColor: colors.textReverse,
      unCheckedBorderColor: colors.border,
    },
    primary: {
      checkMarkColor: colors.textReverse,
      checkedColor: colors.primary,
      uncheckedColor: colors.textReverse,
      unCheckedBorderColor: colors.border,
    },
    error: {
      checkMarkColor: colors.textReverse,
      checkedColor: colors.primary,
      uncheckedColor: colors.textReverse,
      unCheckedBorderColor: colors.error,
    },
  }[nature ?? 'default'])

export type CheckBoxProps = {
  size?: keyof typeof SIZES
  checked: boolean
  onPress: () => void
  color?: COLORS
  label: string | JSX.Element
  labelColor?: keyof Omit<Colors, 'platform'>
  error?: boolean
  onBlur?: () => void
  onFocus?: () => void
}

const CheckBox: React.FC<CheckBoxProps> = ({
  size = 'sm',
  label,
  checked,
  onPress,
  error,
  onBlur,
  onFocus,
  color = 'primary',
  labelColor = 'textPrimary',
}) => {
  const {theme} = useTheme()
  const {height, width, fontSize} = SIZES[size]
  const progress = useDerivedValue<number>(() => withTiming(checked ? 1 : 0))
  const {checkedColor, uncheckedColor, unCheckedBorderColor, checkMarkColor} = getColorNatures({
    colors: theme.colors,
    nature: error ? 'error' : color,
  })

  return (
    <Pressable
      onBlur={onBlur}
      onPress={onPress}
      onFocus={onFocus}
      style={{flexDirection: 'row', alignItems: 'center', columnGap: 15}}
    >
      <Svg viewBox='0 0 49 49' height={height} width={width}>
        <AnimatedCheckBox
          progress={progress}
          checkedColor={checkedColor}
          uncheckedColor={uncheckedColor}
          unCheckedBorderColor={unCheckedBorderColor}
        />
        <CheckMark progress={progress} color={checkMarkColor} />
      </Svg>
      {React.isValidElement(label) ? (
        label
      ) : (
        <Text style={{fontSize, color: theme.colors[labelColor]}}>{label}</Text>
      )}
    </Pressable>
  )
}

export default CheckBox
