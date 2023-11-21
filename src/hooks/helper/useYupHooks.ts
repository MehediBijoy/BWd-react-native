import {AnyObjectSchema} from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {FieldValues, useForm, UseFormProps, UseFormReturn} from 'react-hook-form'

import {SetErrorKey} from 'types'
import {ErrorObject} from 'api/Errors'

type YupHooksProps<T extends FieldValues> = {
  schema: AnyObjectSchema
} & UseFormProps<T>

type UseYupHooksReturns<Tdata extends FieldValues> = {
  methods: UseFormReturn<Tdata>
  setApiError: (props: ErrorObject) => void
  setFieldError: (props: SetFieldErrorProps<Tdata>) => void
}

type SetFieldErrorProps<Tdata extends FieldValues> = {
  message: string
  field: keyof Tdata
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

        methods.setError(formattedKey as SetErrorKey, {
          type: 'validate',
          message: errors.join(', '),
        })
      })
    }
  }

  const setFieldError = ({message, field}: SetFieldErrorProps<Tdata>) =>
    methods.setError(field as SetErrorKey, {
      type: 'validate',
      message,
    })

  return {methods, setApiError, setFieldError}
}

export default useYupHooks
