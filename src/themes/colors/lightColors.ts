import {lightColors as defaultLightColors, Colors} from '@rneui/themed'

export const lightColors: Colors = {
  ...defaultLightColors,
  primaryLight: '#AAF27F',
  primary: '#86C22E',
  primaryDark: '#229A16',

  secondaryLight: '#ffe89e',
  secondary: '#d7b66f',
  secondaryDark: '#a46842',

  tertiaryLight: '#46887c',
  tertiary: '#125B50',
  tertiaryDark: '#003128',

  bgBody: '#FFFFFF',
  bgPaper: '#F5F5F5',

  warning: '#FFC107',
  error: '#E55050',
}

declare module '@rneui/themed' {
  interface Colors {
    readonly primaryLight: string
    readonly primaryDark: string
    readonly secondaryLight: string
    readonly secondaryDark: string
    readonly tertiary: string
    readonly tertiaryLight: string
    readonly tertiaryDark: string

    readonly bgBody: string
    readonly bgPaper: string
  }
}
