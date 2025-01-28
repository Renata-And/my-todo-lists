import type { DomainTodolist, Todolist } from '../api/todolistsApi.types'
import type { Dispatch } from 'redux'
import { todolistsApi } from '../api/todolistsApi'

export type FilterValuesType = 'all' | 'active' | 'completed'

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case 'SET_TODOLISTS': {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all' }))
    }
    case 'ADD_TODOLIST': {
      const { todolist } = action.payload
      return [{ ...todolist, filter: 'all' }, ...state]
    }
    case 'DELETE_TODOLIST': {
      const { id } = action.payload
      return state.filter((tl) => tl.id !== id)
    }
    case 'UPDATE_TODOLIST_TITLE': {
      const { id, title } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, title: title } : tl))
    }
    case 'CHANGE_TODOLIST_FILTER': {
      const { id, filter } = action.payload
      return state.map((tl) => (tl.id === id ? { ...tl, filter: filter } : tl))
    }
    default:
      return state
  }
}

// Thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolists(res.data))
  })
}
export const addTodolistTC = (payload: { title: string }) => (dispatch: Dispatch) => {
  todolistsApi.createTodolists({ title: payload.title }).then((res) => {
    dispatch(addTodolistAC({ todolist: res.data.data.item }))
  })
}
export const deleteTodolistTC = (payload: { id: string }) => (dispatch: Dispatch) => {
  todolistsApi.removeTodolist({ id: payload.id }).then(() => {
    dispatch(deleteTodolistAC({ id: payload.id }))
  })
}
export const changeTodolistTitleTC = (payload: { id: string; title: string }) => (dispatch: Dispatch) => {
  todolistsApi.updateTodolist({ id: payload.id, title: payload.title }).then(() => {
    dispatch(changeTodolistTitleAC({ id: payload.id, title: payload.title }))
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
export const changeTodolistFilterAC = (payload: { filter: FilterValuesType; id: string }) => {
  return { type: 'CHANGE_TODOLIST_FILTER', payload } as const
}

// Actions types
export type SetTodolists = ReturnType<typeof setTodolists>
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type UpdateTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType =
  | DeleteTodolistActionType
  | AddTodolistActionType
  | UpdateTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolists
