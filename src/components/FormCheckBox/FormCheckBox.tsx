import {Controller, useFormContext} from 'react-hook-form'

import CheckBox, {CheckBoxProps} from 'components/CheckBox'

type FormCheckBoxProps = {
  name: string
} & Omit<CheckBoxProps, 'checked'>

const FormCheckBox = ({name, title, ...props}: FormCheckBoxProps) => {
  const {control} = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <CheckBox
          title={title}
          checked={field.value}
          error={Boolean(fieldState.error)}
          onIconPress={() => field.onChange(!field.value)}
          onBlur={field.onBlur}
          {...props}
        />
      )}
    />
  )
}

export type {FormCheckBoxProps}
export default FormCheckBox
