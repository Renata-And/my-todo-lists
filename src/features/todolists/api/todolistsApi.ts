import { baseApi } from '../../../app/baseApi'
import type { BaseResponse, DomainTodolist, Todolist } from '../lib/types/types'

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => 'todo-lists',
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        return todolists.map((tl) => ({ ...tl, status: 'idle', filter: 'all' }))
      },
      providesTags: ['Todolist'],
    }),
    addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: `todo-lists`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Todolist'],
    }),
    deleteTodolist: build.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `todo-lists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todolist'],
    }),
    changeTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `todo-lists/${id}`,
        method: 'PUT',
        body: { title },
      }),
      invalidatesTags: ['Todolist'],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useAddTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi
