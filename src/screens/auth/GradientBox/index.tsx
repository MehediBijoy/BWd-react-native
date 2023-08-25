import React from 'react'
import {useTheme} from '@rneui/themed'
import {StyleProp, ViewStyle, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

type BoxProps = {
  children: React.ReactNode
  gradientColors?: string[]
  styles?: StyleProp<ViewStyle>
}

const styles = StyleSheet.create({
  gradient: {
    maxWidth: 400,
    borderRadius: 10,
    padding: 20,
  },
})

const GradientBox = (props: BoxProps) => {
  const {theme} = useTheme()
  const colors = React.useMemo(
    () => props.gradientColors ?? [theme.colors.tertiary, theme.colors.tertiaryDark],
    [theme, props.gradientColors]
  )

  const gradientStyles = StyleSheet.compose(styles.gradient, props.styles)

  return (
    <LinearGradient colors={colors} style={gradientStyles}>
      {props.children}
    </LinearGradient>
  )
}

export default GradientBox
