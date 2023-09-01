import {ReactNode} from 'react'
import {FormProvider, UseFormReturn, FieldValues} from 'react-hook-form'
import {View, ViewProps} from 'react-native'

type FormProps<Tdata extends FieldValues> = {
  children: ReactNode
  methods: UseFormReturn<Tdata>
} & ViewProps

const Form = <Tdata extends FieldValues>({children, methods, ...props}: FormProps<Tdata>) => (
  <FormProvider {...methods}>
    <View {...props}>{children}</View>
  </FormProvider>
)

export default Form
