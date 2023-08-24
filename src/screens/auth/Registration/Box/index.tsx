import React from 'react'
import {useTheme} from '@rneui/themed'
import {StyleProp, ViewStyle, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import ContainContainer from 'components/ContentContainer'

type BoxProps = {
  children: React.ReactNode
  gradient?: boolean
  gradientColors?: string[]
  gradientStyles?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  gradient: {
    maxWidth: 400,
    borderRadius: 10,
    padding: 20,
  },
})

const Box = (props: BoxProps) => {
  const {theme} = useTheme()
  const colors = React.useMemo(
    () => props.gradientColors ?? [theme.colors.tertiary, theme.colors.tertiaryDark],
    [theme, props.gradientColors]
  )

  const containerStyles = StyleSheet.compose(styles.container, props.style)
  const gradientStyles = StyleSheet.compose(styles.gradient, props.gradientStyles)

  if (props.gradient) {
    return (
      <ContainContainer style={containerStyles}>
        <LinearGradient colors={colors} style={gradientStyles}>
          {props.children}
        </LinearGradient>
      </ContainContainer>
    )
  }

  return <ContainContainer style={containerStyles}>{props.children}</ContainContainer>
}

export default Box
