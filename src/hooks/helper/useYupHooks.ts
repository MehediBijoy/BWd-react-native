import {AnyObjectSchema} from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {FieldValues, useForm, UseFormProps, UseFormReturn} from 'react-hook-form'

import {ErrorObject} from 'api/Errors'

type YupHooksProps<T extends FieldValues> = {
  schema: AnyObjectSchema
} & UseFormProps<T>

type UseYupHooksReturns<Tdata extends FieldValues> = {
  methods: UseFormReturn<Tdata>
  setApiError: (props: ErrorObject) => void
}

const useYupHooks = <Tdata extends FieldValues>({
  mode = 'all',
  schema,
  ...props
}: YupHooksProps<Tdata>): UseYupHooksReturns<Tdata> => {
  const methods = useForm<Tdata>({
    mode,
    resolver: yupResolver(schema),
    ...props,
  })

  const setApiError = ({fields}: ErrorObject) => {
    if (fields) {
      Object.entries(fields).forEach(([key, errors]) => {
        const formattedKey = key.includes('.') ? key.split('.')[1] : key

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: this is typed bug, but code working perfectly
        methods.setError(formattedKey, {
          type: 'validate',
          message: errors.join(', '),
        })
      })
    }
  }

  return {methods, setApiError}
}

export default useYupHooks
