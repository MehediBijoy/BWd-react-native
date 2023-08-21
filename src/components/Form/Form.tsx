import {ReactNode} from 'react'
import {FormProvider, UseFormReturn} from 'react-hook-form'
import {View, ViewProps} from 'react-native'

type FormProps = {
  children: ReactNode
  methods: UseFormReturn
} & ViewProps

const Form = ({children, methods, ...props}: FormProps) => (
  <FormProvider {...methods}>
    <View {...props}>{children}</View>
  </FormProvider>
)

export default Form
