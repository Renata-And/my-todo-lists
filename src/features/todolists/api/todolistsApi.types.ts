export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type FieldError = {
  error: string
  field: string
}

export type BaseResponse<T = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: T
}
