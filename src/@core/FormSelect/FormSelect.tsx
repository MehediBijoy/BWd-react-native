import React from 'react'
import {Controller, useFormContext} from 'react-hook-form'

import Select, {SelectProps} from '@core/Select'

import {ControllerProps} from 'types'
import {useYupLocaleFormat} from 'hooks/helper'

type FormSelectProps = {
  name: string
} & Omit<SelectProps, 'onChange'> &
  ControllerProps

const FormSelect = ({name, defaultValue, shouldUnregister, rules, ...props}: FormSelectProps) => {
  const {control} = useFormContext()
  const {t} = useYupLocaleFormat()

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({field: {onChange, onBlur}, fieldState}) => (
        <Select
          onBlur={onBlur}
          onChange={({value}) => onChange(value)}
          error={fieldState.invalid}
          helperText={t(fieldState.error?.message)}
          {...props}
        />
      )}
    />
  )
}

export default FormSelect
