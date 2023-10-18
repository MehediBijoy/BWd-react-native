import React, {forwardRef} from 'react'
import {Colors, Icon, Text} from '@rneui/themed'
import {View, TextInput, TextInputProps, ViewStyle} from 'react-native'

import {useStyles} from './input.styles'

export type InputProps = {
  color?: keyof Omit<Colors, 'platform'>
  label: string
  error?: boolean
  helperText?: string
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
    helperText,
    onBlur,
    onFocus,
    placeholder,
    style: inputStyles,
    containerStyles,
    leftElement: LeftElement,
    rightElement: RightElement,
    ...props
  }: InputProps,
  ref: React.ForwardedRef<TextInput>
) => {
  const styles = useStyles({color})
  const [isFocused, setIsFocused] = React.useState<boolean>(false)
  const [isVisible, setIsVisible] = React.useState<boolean>(true)
  const styleState = error ? styles.error : isFocused ? styles.focused : null

  if (type === 'password' && !RightElement) {
    RightElement = (
      <Icon
        type='entypo'
        style={{padding: 5}}
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
          ref={ref}
          cursorColor={styles.input.color}
          placeholderTextColor={styles.input.color}
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
          {...props}
        />
        {RightElement ?? null}
      </View>
      {helperText && <Text style={[styles.helperText, styleState]}>{helperText}</Text>}
    </View>
  )
}

export default forwardRef(Input)
