import React, {useState} from 'react'
import {Text, View} from 'react-native'
import {makeStyles, Colors} from '@rneui/themed'
import {Dropdown, IDropdownRef} from 'react-native-element-dropdown'

type DataTypes = {
  label: string
  value: string
}

export type SelectProps = {
  label: string
  color?: keyof Omit<Colors, 'platform'>
  placeholder?: string
  helperText?: string
  error?: boolean
  data: DataTypes[]
  onBlur?: () => void
  onChange?: (props: DataTypes) => void
  selectRef?: React.RefObject<IDropdownRef> | null
}

type StyledTypes = {
  color?: keyof Omit<Colors, 'platform'>
}

const Select: React.FC<SelectProps> = ({
  label,
  color,
  onBlur,
  onChange,
  helperText,
  error,
  placeholder = 'Select an item',
  data,
  selectRef,
}) => {
  const styles = useStyles({color})
  const [isFocused, setIsFocused] = useState(false)
  const styleState = error ? styles.error : isFocused ? styles.focused : null

  return (
    <View style={styles.container}>
      <Text style={[styles.label, styleState]}>{label}</Text>
      <Dropdown
        ref={selectRef}
        style={[styles.dropdown, styleState]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField='label'
        valueField='value'
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          onBlur && onBlur()
          setIsFocused(false)
        }}
        onChange={item => {
          onChange && onChange(item)
          setIsFocused(false)
        }}
      />
      {helperText && <Text style={[styles.helperText, styleState]}>{helperText}</Text>}
    </View>
  )
}

const useStyles = makeStyles(({colors}, {color: defaultColor}: StyledTypes) => ({
  container: {
    display: 'flex',
    rowGap: 5,
  },

  dropdown: {
    height: 50,
    borderColor: defaultColor ? colors[defaultColor] : colors.bgPaper,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: colors.bgPaper,
  },

  label: {
    fontSize: 15,
    marginStart: 5,
    color: defaultColor ? colors[defaultColor] : colors.textPrimary,
  },

  placeholderStyle: {
    fontSize: 15,
  },

  selectedTextStyle: {
    fontSize: 16,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  helperText: {
    fontSize: 13,
    marginStart: 5,
    color: defaultColor ? colors[defaultColor] : colors.textPrimary,
  },

  focused: {
    color: colors.primary,
    borderColor: colors.primary,
  },

  error: {
    color: colors.error,
    borderColor: colors.error,
  },
}))

export default Select
