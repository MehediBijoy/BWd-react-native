import type {ReactNode} from 'react'
import type {Colors as RNColors} from '@rneui/themed'

export type Children = {
  children: ReactNode
}

export type SetErrorKey = `root.${string}`

export type Colors = keyof Omit<RNColors, 'platform'>
