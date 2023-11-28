import type {ReactNode} from 'react'
import type {Colors as RNColors} from '@rneui/themed'
import type {ControllerProps as Controller} from 'react-hook-form'

import {LanguageTypes} from 'i18n/i18n'
import {CurrencyTypes} from 'constants/currency.config'

export type Children = {
  children: ReactNode
}

// types for react-hook-form
export type SetErrorKey = `root.${string}`
export type ControllerProps = Omit<Controller, 'render' | 'name' | 'control'>

export type Colors = keyof Omit<RNColors, 'platform'>

// --------- Types for intl ----------------
interface NumberFormatOptions {
  locales?: LanguageTypes
  localeMatcher?: string | undefined
  style?: 'currency' | 'decimal' | 'percent'
  currency?: CurrencyTypes
  currencySign?: string | undefined
  useGrouping?: boolean | undefined
  minimumIntegerDigits?: number | undefined
  minimumFractionDigits?: number | undefined
  maximumFractionDigits?: number | undefined
  minimumSignificantDigits?: number | undefined
  maximumSignificantDigits?: number | undefined
}
