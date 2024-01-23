import '@rneui/themed'

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

    readonly infoLight: string
    readonly info: string
    readonly infoDarK: string

    readonly bgPaper: string
    readonly border: string
  }
}
