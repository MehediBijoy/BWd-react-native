import {AnyObjectSchema} from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {FieldValues, useForm, UseFormProps, UseFormReturn} from 'react-hook-form'

type YupHooksProps<T extends FieldValues> = {
  schema: AnyObjectSchema
} & UseFormProps<T>

const useYupHooks = <Tdata extends FieldValues>({
  mode = 'all',
  schema,
  ...props
}: YupHooksProps<Tdata>): UseFormReturn<Tdata> => {
  const methods = useForm<Tdata>({
    mode,
    resolver: yupResolver(schema),
    ...props,
  })

  return methods
}

export default useYupHooks
