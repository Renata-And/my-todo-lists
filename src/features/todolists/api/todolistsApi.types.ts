import type { FilterValuesType } from '../model/todolists-reducer'
import type { RequestStatus } from '../../../app/app-reducer'

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  status: RequestStatus
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
