import { addTodolist, deleteTodolist } from './todolistsSlice'
import type { DomainTask } from '../api/tasksApi.types'
import { createSlice } from '@reduxjs/toolkit'

export type TasksType = {
  [key: string]: DomainTask[]
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksType,
  reducers: (create) => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    deleteTask: create.reducer<{ id: string; todolistId: string }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1)
      }
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    }),
    updateTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      const index = tasks.findIndex((t) => t.id === action.payload.task.id)
      if (index !== -1) {
        tasks[index] = action.payload.task
      }
    }),
    clearTasksData: create.reducer(() => {
      return {}
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolist, (state, action) => {
        delete state[action.payload.id]
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { setTasks, updateTask, addTask, clearTasksData, deleteTask } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
