import { type TaskPriority, type TaskStatus } from "common/enums"

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
