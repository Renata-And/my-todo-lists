import type { RequestStatus } from '../../../../app/appSlice'
import type { TaskPriority, TaskStatus } from 'common/enums'

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type DomainTodolist = Todolist & {
  filter: FilterValues
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

export type DomainTask = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTasksResponse = {
  items: DomainTask[]
  error: null | string
  totalCount: number
}

export type UpdateTaskModel = {
  title: string
  status: TaskStatus
  description: string
  priority: TaskPriority
  startDate: string
  deadline: string
}
