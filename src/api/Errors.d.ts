export type ErrorFields = {
  [key: string]: string[]
}

export type ErrorObject<Tdata = ErrorFields> = {
  code: string
  title: string
  message: string
  fields: Tdata
}

export type ApiErrorResponse<Tdata = ErrorFields> = {
  error: ErrorObject<Tdata>
}
