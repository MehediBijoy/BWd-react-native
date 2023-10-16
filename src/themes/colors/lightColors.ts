import {lightColors as defaultLightColors, Colors} from '@rneui/themed'

export const lightColors: Colors = {
  ...defaultLightColors,
  textPrimary: '#000000',
  textReverse: '#FFFFFF',
  textGray: '#787878',

  primaryLight: '#AAF27F',
  primary: '#86C22E',
  primaryDark: '#229A16',

  secondaryLight: '#ffe89e',
  secondary: '#d7b66f',
  secondaryDark: '#a46842',

  tertiaryLight: '#46887c',
  tertiary: '#125B50',
  tertiaryDark: '#003128',

  background: '#FFFFFF',
  bgPaper: '#F5F5F5',

  warning: '#FFC107',
  error: '#E55050',

  border: defaultLightColors.greyOutline,
}

declare module '@rneui/themed' {
  interface Colors {
    readonly textPrimary: string
    readonly textReverse: string
    readonly textGray: string

    readonly primaryLight: string
    readonly primaryDark: string
    readonly secondaryLight: string
    readonly secondaryDark: string
    readonly tertiary: string
    readonly tertiaryLight: string
    readonly tertiaryDark: string

    readonly bgPaper: string
    readonly border: string
  }
}
