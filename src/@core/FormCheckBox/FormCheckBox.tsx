import {Controller, useFormContext} from 'react-hook-form'

import {ControllerProps} from 'types'

import CheckBox, {CheckBoxProps} from '../CheckBox'

type FormCheckBoxProps = {
  name: string
} & Omit<CheckBoxProps, 'checked' | 'onPress'> &
  ControllerProps

const FormCheckBox = ({
  name,
  label,
  defaultValue,
  shouldUnregister,
  rules,
  ...props
}: FormCheckBoxProps) => {
  const {control} = useFormContext()

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
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
