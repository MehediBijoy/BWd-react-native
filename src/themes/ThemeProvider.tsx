import {ReactNode, useMemo} from 'react'
import {
  createTheme,
  darkColors,
  lightColors,
  ThemeProvider as BaseThemeProvider,
} from '@rneui/themed'

const ThemeProvider = ({children}: {children: ReactNode}) => {
  const theme = useMemo(
    () =>
      createTheme({
        lightColors: lightColors,
        darkColors: darkColors,
        mode: 'light',
      }),
    []
  )
  return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>
}

export default ThemeProvider
