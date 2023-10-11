import React from 'react'
import {Controller, useFormContext, ControllerProps} from 'react-hook-form'

import Select, {SelectProps} from '@core/Select'

type FormSelectProps = {
  name: string
} & Omit<SelectProps, 'onChange'> &
  Omit<ControllerProps, 'render'>

const FormSelect = ({name, ...props}: FormSelectProps) => {
  const {control} = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, onBlur}, fieldState}) => (
        <Select
          onBlur={onBlur}
          onChange={({value}) => onChange(value)}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
          {...props}
        />
      )}
    />
  )
}

export default FormSelect
