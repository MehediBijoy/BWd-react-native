import {ReactNode, useMemo} from 'react'
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import {createTheme, darkColors, ThemeProvider as BaseThemeProvider} from '@rneui/themed'

import {lightColors} from './colors'

const ThemeProvider = ({children}: {children: ReactNode}) => {
  const theme = useMemo(
    () =>
      createTheme({
        lightColors,
        darkColors,
        mode: 'light',
        components: {
          Text: () => ({
            style: {flexShrink: 1},
          }),
          Button: () => ({
            containerStyle: {borderRadius: 8},
          }),
        },
      }),
    []
  )

  const navigationTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: lightColors.primary,
        background: lightColors.background,
        text: lightColors.textPrimary,
        border: lightColors.bgPaper,
      },
    }),
    []
  )

  return (
    <BaseThemeProvider theme={theme}>
      <NavigationContainer theme={navigationTheme}>{children}</NavigationContainer>
    </BaseThemeProvider>
  )
}

export default ThemeProvider
