import { AddTodolistActionType, type ClearTodolistsDataActionType, DeleteTodolistActionType } from './todolists-reducer'
import type { Dispatch } from 'redux'
import { tasksApi } from '../api/tasksApi'
import type { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from '../api/tasksApi.types'
import { setAppStatusAC } from '../../../app/app-reducer'
import { ResultCode } from 'common/enums'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'

export type TasksType = {
  [key: string]: DomainTask[]
}

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
    case 'SET_TASK': {
      const { todolistId, tasks } = action.payload
      const stateCopy = { ...state }
      stateCopy[todolistId] = tasks
      return stateCopy
    }
    case 'DELETE_TASK': {
      const { id, todolistId } = action.payload
      const newTasksState = state[todolistId].filter((t) => t.id !== id)
      return { ...state, [todolistId]: newTasksState }
    }
    case 'ADD_TASK': {
      const { task } = action.payload
      return { ...state, [task.todoListId]: [task, ...state[task.todoListId]] }
    }
    case 'UPDATE_TASK': {
      const { task } = action.payload
      return { ...state, [task.todoListId]: state[task.todoListId].map((t) => (t.id === task.id ? { ...task } : t)) }
    }
    case 'ADD_TODOLIST': {
      const { todolist } = action.payload
      return { ...state, [todolist.id]: [] }
    }
    case 'DELETE_TODOLIST': {
      const { id } = action.payload
      const newState = { ...state }
      delete newState[id]
      return newState
    }
    case 'CLEAR_DATA':
      return {}
    default:
      return state
  }
}

// Thunks
export const fetchTasksTC = (payload: { todolistId: string }) => (dispatch: Dispatch) => {
  const { todolistId } = payload
  dispatch(setAppStatusAC('loading'))
  tasksApi
    .getTasks({ todolistId })
    .then((res) => {
      const tasks = res.data.items
      dispatch(setTasksAC({ todolistId, tasks }))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const deleteTaskTC = (payload: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
  const { taskId, todolistId } = payload
  dispatch(setAppStatusAC('loading'))
  tasksApi
    .deleteTask({ taskId, todolistId })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(deleteTaskAC({ id: taskId, todolistId }))
        dispatch(setAppStatusAC('succeeded'))
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
  dispatch(setAppStatusAC('loading'))
  tasksApi
    .createTask({ title, todolistId })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTaskAC({ task: res.data.data.item }))
        dispatch(setAppStatusAC('succeeded'))
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
  dispatch(setAppStatusAC('loading'))
  tasksApi
    .updateTask({ task: payload.task, model })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(updateTaskAC({ task: res.data.data.item }))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

// Action creators
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return { type: 'SET_TASK', payload } as const
}
export const deleteTaskAC = (payload: { id: string; todolistId: string }) => {
  return { type: 'DELETE_TASK', payload } as const
}
export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: 'ADD_TASK', payload } as const
}
export const updateTaskAC = (payload: { task: DomainTask }) => {
  return { type: 'UPDATE_TASK', payload } as const
}

// Actions types
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

type ActionsType =
  | DeleteTaskActionType
  | AddTaskActionType
  | AddTodolistActionType
  | DeleteTodolistActionType
  | SetTasksActionType
  | UpdateTaskActionType
  | ClearTodolistsDataActionType
