import {ReactNode, useMemo} from 'react'
import {createTheme, darkColors, ThemeProvider as BaseThemeProvider} from '@rneui/themed'
import {NavigationContainer, DefaultTheme, LinkingOptions} from '@react-navigation/native'

import {RouteStack} from 'navigators/routes'

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
            style: {flexShrink: 1, fontSize: 14},
          }),
          Button: () => ({
            buttonStyle: {borderRadius: 8},
          }),
          Divider: (props, theme) => ({
            color: theme.colors.bgPaper,
            width: 1,
            ...props,
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

  const linking: LinkingOptions<RouteStack> = {
    prefixes: ['brettonwoods://', 'https://*.brettonwoods.gold'],
    config: {
      screens: {
        RegistrationForm: 'register/:token/:platform/:user?',
      },
    },
  }

  return (
    <BaseThemeProvider theme={theme}>
      <NavigationContainer theme={navigationTheme} linking={linking}>
        {children}
      </NavigationContainer>
    </BaseThemeProvider>
  )
}

export default ThemeProvider
