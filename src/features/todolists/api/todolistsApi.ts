import type { BaseResponse, Todolist } from "./todolistsApi.types"
import { instance } from "common/instance"

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists")
  },
  updateTodolist(payload: { id: string; title: string }) {
    return instance.put<BaseResponse>(`todo-lists/${payload.id}`, { title: payload.title })
  },
  removeTodolist(payload: { id: string }) {
    return instance.delete<BaseResponse>(`todo-lists/${payload.id}`)
  },
  createTodolists(payload: { title: string }) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title: payload.title })
  },
}
