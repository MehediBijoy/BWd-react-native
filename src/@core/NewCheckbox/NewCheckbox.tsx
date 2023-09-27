import React from 'react'
import {Colors, Text, makeStyles} from '@rneui/themed'
import {StyleProp, ViewStyle, Pressable} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated'

import ImageIcon from './check.png'

export type CheckBoxProps = {
  checked: boolean
  onPress: () => void
  label: string | JSX.Element
  color?: keyof Omit<Colors, 'platform'>
  error?: boolean
  style?: StyleProp<ViewStyle>
}

const NewCheckbox = ({checked, onPress, label, style: containerStyles}: CheckBoxProps) => {
  const progress = useSharedValue(0)
  const styles = useStyles()

  const imageAnimation = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value, {duration: 0}),
  }))

  const boxAnimation = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [1, 0], ['green', 'transparent']),
    borderWidth: interpolateColor(progress.value, [0, 1], [2, 0]),
  }))

  React.useEffect(() => {
    progress.value = checked ? 1 : 0
  }, [checked, progress])

  return (
    <Pressable onPress={onPress} style={[styles.container, containerStyles]}>
      <Animated.View style={[styles.box, boxAnimation]}>
        <Animated.Image source={ImageIcon} style={[styles.icon, imageAnimation]} />
      </Animated.View>
      {React.isValidElement(label) ? label : <Text style={styles.label}>{label}</Text>}
    </Pressable>
  )
}

const useStyles = makeStyles(({colors}) => ({
  container: {
    flexDirection: 'row',
    columnGap: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  box: {
    height: 30,
    width: 30,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    width: 20,
  },
  label: {
    fontSize: 15,
  },
}))

export default NewCheckbox
