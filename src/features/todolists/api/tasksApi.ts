import type { DomainTask, GetTasksResponse, UpdateTaskModel } from './tasksApi.types'
import { instance } from 'common/instance'
import type { BaseResponse } from './todolistsApi.types'
import { baseApi } from 'app/baseApi'
import { url } from 'inspector'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string }>({
      query: ({ todolistId }) => `todo-lists/${todolistId}/tasks`,
      providesTags: ['Task'],
    }),
    addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { title: string; todolistId: string }>({
      query: ({ title, todolistId }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: build.mutation<BaseResponse, { taskId: string; todolistId: string }>({
      query: ({ taskId, todolistId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: build.mutation<BaseResponse<{ item: DomainTask }>, { task: DomainTask; model: UpdateTaskModel }>({
      query: ({ task, model }) => ({
        url: `todo-lists/${task.todoListId}/tasks/${task.id}`,
        method: 'PUT',
        body: model,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
})

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi

export const _tasksApi = {
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
