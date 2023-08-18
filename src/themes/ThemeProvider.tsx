import {ReactNode, useMemo} from 'react'
import {createTheme, darkColors, ThemeProvider as BaseThemeProvider} from '@rneui/themed'

import {lightColors} from './colors'

const ThemeProvider = ({children}: {children: ReactNode}) => {
  const theme = useMemo(
    () =>
      createTheme({
        lightColors,
        darkColors,
        mode: 'light',
      }),
    []
  )
  return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>
}

export default ThemeProvider
