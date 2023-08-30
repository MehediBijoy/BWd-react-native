import React from 'react'
import {useFormContext, Controller} from 'react-hook-form'

import Input, {InputProps} from 'components/Input'

export type FormInputProps = {
  name: string
} & InputProps

const FormInput = ({name, ...props}: FormInputProps) => {
  const {control} = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, ...restField}, fieldState}) => (
        <Input
          onChangeText={onChange}
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
