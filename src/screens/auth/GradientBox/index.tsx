import React from 'react'
import {useTheme, makeStyles} from '@rneui/themed'
import {StyleProp, ViewStyle, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

type BoxProps = {
  children: React.ReactNode
  gradientColors?: string[]
  style?: StyleProp<ViewStyle>
}

const useStyles = makeStyles(() => ({
  gradient: {
    borderRadius: 10,
    padding: 20,
  },
}))

const GradientBox = (props: BoxProps) => {
  const styles = useStyles()
  const {theme} = useTheme()
  const colors = React.useMemo(
    () => props.gradientColors ?? [theme.colors.tertiary, theme.colors.tertiaryDark],
    [theme, props.gradientColors]
  )

  const gradientStyles = StyleSheet.compose(styles.gradient, props.style)

  return (
    <LinearGradient colors={colors} style={gradientStyles}>
      {props.children}
    </LinearGradient>
  )
}

export default GradientBox
