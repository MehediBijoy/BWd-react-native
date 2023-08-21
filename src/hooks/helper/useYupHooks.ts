import {AnyObjectSchema} from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, UseFormProps, UseFormReturn} from 'react-hook-form'

type YupHooksProps = {
  schema: AnyObjectSchema
} & UseFormProps

const useYupHooks = ({mode = 'all', schema, ...props}: YupHooksProps): UseFormReturn => {
  const methods = useForm({
    mode,
    resolver: yupResolver(schema),
    ...props,
  })
  return methods
}

export default useYupHooks
