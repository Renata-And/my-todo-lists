import { baseApi } from 'app/baseApi'
import type { BaseResponse, DomainTask, GetTasksResponse, UpdateTaskModel } from '../lib/types/types'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string }>({
      query: ({ todolistId }) => `todo-lists/${todolistId}/tasks`,
      providesTags: (res, error, { todolistId }) => (res ? [{ type: 'Task', id: todolistId }] : ['Task']),
    }),
    addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { title: string; todolistId: string }>({
      query: ({ title, todolistId }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: (res, error, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
    deleteTask: build.mutation<BaseResponse, { taskId: string; todolistId: string }>({
      query: ({ taskId, todolistId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
    updateTask: build.mutation<BaseResponse<{ item: DomainTask }>, { task: DomainTask; model: UpdateTaskModel }>({
      query: ({ task, model }) => ({
        url: `todo-lists/${task.todoListId}/tasks/${task.id}`,
        method: 'PUT',
        body: model,
      }),
      invalidatesTags: (result, error, { task }) => [{ type: 'Task', id: task.todoListId }],
    }),
  }),
})

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
