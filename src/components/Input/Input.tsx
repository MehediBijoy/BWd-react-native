import React from 'react'
import {useFormContext, Controller} from 'react-hook-form'
import {View, Text, TextProps, StyleSheet, TextInput, TextInputProps, ViewStyle} from 'react-native'

import {useStyles} from './input.styles'

export type InputProps = {
  name: string
  label: string
  type?: 'password' | 'text'
  labelProps?: TextProps
  container?: ViewStyle
  leftElement?: JSX.Element
  rightElement?: JSX.Element
} & TextInputProps

const Input = ({
  name,
  label,
  type = 'text',
  placeholder,
  leftElement: LeftElement,
  rightElement: RightElement,
  ...props
}: InputProps) => {
  const styles = useStyles()
  const {control} = useFormContext()
  const [isFocused, setIsFocused] = React.useState<boolean>(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, onBlur, ...restFields}, fieldState}) => {
        const style = fieldState.error ? styles.error : isFocused ? styles.focused : null
        return (
          <View style={styles.container}>
            <Text
              {...props.labelProps}
              style={StyleSheet.flatten([
                styles.label,
                fieldState.error || isFocused ? style : props.labelProps?.style,
              ])}
            >
              {label}
            </Text>
            <View style={StyleSheet.flatten([styles.inputWrapper, style])}>
              {LeftElement ?? null}
              <TextInput
                placeholder={placeholder}
                secureTextEntry={type === 'password'}
                style={styles.input}
                onChangeText={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  onBlur()
                  setIsFocused(false)
                }}
                {...restFields}
              />
              {RightElement ?? null}
            </View>
            {fieldState.error && (
              <Text style={StyleSheet.flatten([styles.errorText, styles.error])}>
                {fieldState.error.message}
              </Text>
            )}
          </View>
        )
      }}
    />
  )
}

export default Input
