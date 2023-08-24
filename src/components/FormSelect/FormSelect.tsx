import React, {useState} from 'react'
import {Text, View} from 'react-native'
import {makeStyles, Colors, useTheme} from '@rneui/themed'
import {Controller, useFormContext} from 'react-hook-form'
import {Dropdown} from 'react-native-element-dropdown'

type DataTypes = {
  label: string
  value: string
}

type FormSelectProps = {
  name: string
  label: string
  labelColor?: keyof Omit<Colors, 'platform'>
  placeholder?: string
  data: DataTypes[]
}

const FormSelect = ({
  name,
  label,
  labelColor,
  placeholder = 'Select an item',
  data,
}: FormSelectProps) => {
  const {theme} = useTheme()
  const styles = useStyles()
  const {control} = useFormContext()
  const [isFocus, setIsFocus] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <View style={styles.container}>
          <Text
            style={[
              styles.label,
              {color: labelColor && theme.colors[labelColor]},
              fieldState.error ? styles.error : isFocus && styles.focused,
            ]}
          >
            {label}
          </Text>
          <Dropdown
            style={[styles.dropdown, fieldState.error ? styles.error : isFocus && styles.focused]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data}
            labelField='label'
            valueField='value'
            placeholder={placeholder}
            value={field.value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              field.onBlur()
              setIsFocus(false)
            }}
            onChange={item => {
              field.onChange(item.value)
              setIsFocus(false)
            }}
          />
          {fieldState.error && (
            <Text style={[styles.error, styles.errorText]}>{fieldState.error.message}</Text>
          )}
        </View>
      )}
    />
  )
}

export default FormSelect

const useStyles = makeStyles(({colors}) => ({
  container: {
    display: 'flex',
    rowGap: 5,
  },

  dropdown: {
    height: 50,
    borderColor: colors.bgPaper,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: colors.bgPaper,
  },

  icon: {
    marginRight: 5,
  },

  label: {
    fontSize: 15,
    marginStart: 5,
    color: colors.black,
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

  focused: {
    color: colors.primary,
    borderColor: colors.primary,
  },

  errorText: {
    fontSize: 13,
    marginStart: 5,
    textTransform: 'capitalize',
  },

  error: {
    color: colors.error,
    borderColor: colors.error,
  },
}))
