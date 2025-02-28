import { addTodolist, deleteTodolist } from './todolistsSlice'
import type { Dispatch } from 'redux'
import { _tasksApi } from '../api/tasksApi'
import type { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from '../api/tasksApi.types'
import { setAppStatus } from '../../../app/appSlice'
import { ResultCode } from 'common/enums'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
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

// Thunks
export const fetchTasksTC = (payload: { todolistId: string }) => (dispatch: Dispatch) => {
  const { todolistId } = payload
  dispatch(setAppStatus({ status: 'loading' }))
  _tasksApi
    .getTasks({ todolistId })
    .then((res) => {
      const tasks = res.data.items
      dispatch(setTasks({ todolistId, tasks }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const deleteTaskTC = (payload: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
  const { taskId, todolistId } = payload
  dispatch(setAppStatus({ status: 'loading' }))
  _tasksApi
    .deleteTask({ taskId, todolistId })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(deleteTask({ id: taskId, todolistId }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const addTaskTC = (payload: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
  const { title, todolistId } = payload
  dispatch(setAppStatus({ status: 'loading' }))
  _tasksApi
    .createTask({ title, todolistId })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTask({ task: res.data.data.item }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const updateTaskTC = (payload: { task: DomainTask; model: UpdateTaskDomainModel }) => (dispatch: Dispatch) => {
  const model: UpdateTaskModel = {
    title: payload.model.title ? payload.model.title : payload.task.title,
    status: payload.model.status ? payload.model.status : payload.task.status,
    startDate: payload.task.startDate,
    priority: payload.task.priority,
    description: payload.task.description,
    deadline: payload.task.deadline,
  }
  dispatch(setAppStatus({ status: 'loading' }))
  _tasksApi
    .updateTask({ task: payload.task, model })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(updateTask({ task: res.data.data.item }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
