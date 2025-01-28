import type { DomainTask, GetTasksResponse, UpdateTaskModel } from './tasksApi.types'
import { instance } from 'common/instance'
import type { BaseResponse } from './todolistsApi.types'

export const tasksApi = {
  getTasks(payload: { todolistId: string }) {
    return instance.get<GetTasksResponse>(`todo-lists/${payload.todolistId}/tasks`)
  },
  createTask(payload: { title: string; todolistId: string }) {
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${payload.todolistId}/tasks`, {
      title: payload.title,
    })
  },
  deleteTask(payload: { taskId: string; todolistId: string }) {
    return instance.delete<BaseResponse>(`todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
  },
  updateTask(payload: { task: DomainTask; model: UpdateTaskModel }) {
    return instance.put<
      BaseResponse<{
        item: DomainTask
      }>
    >(`todo-lists/${payload.task.todoListId}/tasks/${payload.task.id}`, payload.model)
  },
}
