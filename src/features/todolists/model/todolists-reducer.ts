import type { DomainTodolist, Todolist } from '../api/todolistsApi.types'
import type { Dispatch } from 'redux'
import { todolistsApi } from '../api/todolistsApi'
import { type RequestStatus, setAppStatusAC } from '../../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
import { ResultCode } from 'common/enums'

export type FilterValuesType = 'all' | 'active' | 'completed'

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case 'SET_TODOLISTS': {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', status: 'idle' }))
    }
    case 'ADD_TODOLIST': {
      const { todolist } = action.payload
      return [{ ...todolist, filter: 'all', status: 'idle' }, ...state]
    }
    case 'DELETE_TODOLIST': {
      const { id } = action.payload
      return state.filter((tl) => tl.id !== id)
    }
    case 'UPDATE_TODOLIST_TITLE': {
      const { id, title } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, title } : tl))
    }
    case 'CHANGE_TODOLIST_FILTER': {
      const { id, filter } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, filter } : tl))
    }
    case 'CHANGE_TODOLIST_STATUS': {
      const { id, status } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, status } : tl))
    }
    default:
      return state
  }
}

// Thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setTodolists(res.data))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const addTodolistTC = (payload: { title: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsApi
    .createTodolists({ title: payload.title })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTodolistAC({ todolist: res.data.data.item }))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const deleteTodolistTC = (payload: { id: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeTodolistsEntityStatusAC({ id: payload.id, status: 'loading' }))
  todolistsApi
    .removeTodolist({ id: payload.id })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(deleteTodolistAC({ id: payload.id }))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
    .finally(() => {
      dispatch(changeTodolistsEntityStatusAC({ id: payload.id, status: 'idle' }))
    })
}
export const changeTodolistTitleTC = (payload: { id: string; title: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsApi
    .updateTodolist({ id: payload.id, title: payload.title })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(changeTodolistTitleAC({ id: payload.id, title: payload.title }))
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
export const setTodolists = (todolists: Todolist[]) => {
  return { type: 'SET_TODOLISTS', payload: { todolists } } as const
}
export const addTodolistAC = (payload: { todolist: Todolist }) => {
  return { type: 'ADD_TODOLIST', payload } as const
}
export const deleteTodolistAC = (payload: { id: string }) => {
  return { type: 'DELETE_TODOLIST', payload: { id: payload.id } } as const
}
export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: 'UPDATE_TODOLIST_TITLE', payload } as const
}
export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: 'CHANGE_TODOLIST_FILTER', payload } as const
}
export const changeTodolistsEntityStatusAC = (payload: { id: string; status: RequestStatus }) => {
  return { type: 'CHANGE_TODOLIST_STATUS', payload } as const
}

// Actions types
export type SetTodolists = ReturnType<typeof setTodolists>
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type UpdateTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistsEntityStatusActionType = ReturnType<typeof changeTodolistsEntityStatusAC>

type ActionsType =
  | DeleteTodolistActionType
  | AddTodolistActionType
  | UpdateTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolists
  | ChangeTodolistsEntityStatusActionType
