import { baseApi } from 'app/baseApi'
import type { BaseResponse, DomainTask, GetTasksResponse, UpdateTaskModel } from '../lib/types/types'

export const PAGE_SIZE = 4

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; args: { page: number } }>({
      query: ({ todolistId, args }) => {
        const params = { ...args, count: PAGE_SIZE }
        return {
          method: 'GET',
          url: `todo-lists/${todolistId}/tasks`,
          params,
        }
      },
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
    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        method: 'PUT',
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
      }),
      async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks')
        console.log({ model })

        let patchResults: any[] = []

        cachedArgsForQuery.forEach(({ args }) => {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData('getTasks', { todolistId, args: { page: args.page } }, (state) => {
                state.items = state.items.map((task) => (task.id === taskId ? { ...task, status: model.status } : task))
              }),
            ),
          )
        })
        try {
          await queryFulfilled
        } catch {
          patchResults.forEach((patchResult) => {
            patchResult.undo()
          })
        }
      },
      invalidatesTags: (res, err, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
