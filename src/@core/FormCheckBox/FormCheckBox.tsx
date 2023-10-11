import {Controller, useFormContext, ControllerProps} from 'react-hook-form'

import CheckBox, {CheckBoxProps} from '../CheckBox'

type FormCheckBoxProps = {
  name: string
} & Omit<CheckBoxProps, 'checked' | 'onPress'> &
  Omit<ControllerProps, 'render'>

const FormCheckBox = ({name, label, ...props}: FormCheckBoxProps) => {
  const {control} = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <CheckBox
          label={label}
          checked={field.value}
          error={Boolean(fieldState.error)}
          onPress={() => field.onChange(!field.value)}
          onBlur={field.onBlur}
          {...props}
        />
      )}
    />
  )
}

export type {FormCheckBoxProps}
export default FormCheckBox
