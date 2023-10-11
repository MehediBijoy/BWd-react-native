import React from 'react'
import {useFormContext, Controller} from 'react-hook-form'

import Input, {InputProps} from '@core/Input'

import {ControllerProps} from 'types'

export type FormInputProps = {
  name: string
} & InputProps &
  ControllerProps

const FormInput: React.FC<FormInputProps> = ({name, onChangeText, ...props}) => {
  const {control} = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, ...restField}, fieldState}) => (
        <Input
          onChangeText={props => {
            onChange(props)
            onChangeText && onChangeText(props)
          }}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
          {...restField}
          {...props}
        />
      )}
    />
  )
}

export default FormInput
