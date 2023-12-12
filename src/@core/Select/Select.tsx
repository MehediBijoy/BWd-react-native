import React, {useState} from 'react'
import {View} from 'react-native'
import {makeStyles, Colors, Text} from '@rneui/themed'
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
  value?: string
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
  value,
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
        itemTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        value={value}
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
    color: colors.textPrimary,
  },

  selectedTextStyle: {
    fontSize: 16,
    color: colors.textPrimary,
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
