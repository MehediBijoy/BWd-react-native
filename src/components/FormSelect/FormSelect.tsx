import React from 'react'
import {Controller, useFormContext} from 'react-hook-form'

import Select, {SelectProps} from 'components/Select'

type FormSelectProps = {
  name: string
} & Omit<SelectProps, 'onChange'>

const FormSelect = ({name, ...props}: FormSelectProps) => {
  const {control} = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, ...restFields}, fieldState}) => (
        <Select
          onChange={({value}) => onChange(value)}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
          {...restFields}
          {...props}
        />
      )}
    />
  )
}

export default FormSelect
