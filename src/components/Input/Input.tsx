import React, {forwardRef} from 'react'
import {Colors, Icon} from '@rneui/themed'
import {View, Text, TextInput, TextInputProps, ViewStyle} from 'react-native'

import {useStyles} from './input.styles'

export type InputProps = {
  color?: keyof Omit<Colors, 'platform'>
  label: string
  error?: boolean
  halperText?: string
  type?: 'password' | 'text'
  onBlur?: () => void
  onFocus?: () => void
  containerStyles?: ViewStyle
  leftElement?: JSX.Element
  rightElement?: JSX.Element
} & TextInputProps

const Input = (
  {
    color,
    label,
    error,
    type = 'text',
    halperText,
    onBlur,
    onFocus,
    placeholder,
    style: inputStyles,
    containerStyles,
    leftElement: LeftElement,
    rightElement: RightElement,
    ...props
  }: InputProps,
  ref: any
) => {
  const styles = useStyles({color})
  const [isFocused, setIsFocused] = React.useState<boolean>(false)
  const [isVisible, setIsVisible] = React.useState<boolean>(true)
  const styleState = error ? styles.error : isFocused ? styles.focused : null

  if (type === 'password') {
    RightElement = (
      <Icon
        type='entypo'
        name={isVisible ? 'eye' : 'eye-with-line'}
        onPress={() => setIsVisible(preState => !preState)}
      />
    )
  }

  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[styles.label, styleState]}>{label}</Text>
      <View style={[styles.inputWrapper, styleState]}>
        {LeftElement ?? null}
        <TextInput
          placeholder={placeholder}
          secureTextEntry={type === 'password' ? isVisible : false}
          style={[styles.input, inputStyles]}
          onFocus={() => {
            onFocus && onFocus()
            setIsFocused(true)
          }}
          onBlur={() => {
            onBlur && onBlur()
            setIsFocused(false)
          }}
          ref={ref}
          {...props}
        />
        {RightElement ?? null}
      </View>
      {halperText && <Text style={[styles.helperText, styleState]}>{halperText}</Text>}
    </View>
  )
}

export default forwardRef(Input)
