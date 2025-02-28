import type { DomainTodolist, Todolist } from '../api/todolistsApi.types'
import type { Dispatch } from 'redux'
import { _todolistsApi } from '../api/todolistsApi'
import { type RequestStatus, setAppStatus } from '../../../app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
import { ResultCode } from 'common/enums'
import { createSlice } from '@reduxjs/toolkit'

export type FilterValuesType = 'all' | 'active' | 'completed'

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      return action.payload.todolists.map((tl) => ({ ...tl, status: 'idle', filter: 'all' }))
    }),
    deleteTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      state.unshift({ ...action.payload.todolist, status: 'idle', filter: 'all' })
    }),
    changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.id)
      if (todolist) {
        todolist.title = action.payload.title
      }
    }),
    changeTodolistEntityStatus: create.reducer<{ id: string; status: RequestStatus }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.id)
      if (todolist) {
        todolist.status = action.payload.status
      }
    }),
    changeTodolistFilter: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    clearTodolistsData: create.reducer(() => {
      return []
    }),
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const {
  changeTodolistTitle,
  changeTodolistFilter,
  changeTodolistEntityStatus,
  setTodolists,
  addTodolist,
  clearTodolistsData,
  deleteTodolist,
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors

// Thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  _todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setTodolists({ todolists: res.data }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const addTodolistTC = (payload: { title: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  _todolistsApi
    .createTodolists({ title: payload.title })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTodolist({ todolist: res.data.data.item }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const deleteTodolistTC = (payload: { id: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  dispatch(changeTodolistEntityStatus({ id: payload.id, status: 'loading' }))
  _todolistsApi
    .removeTodolist({ id: payload.id })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(deleteTodolist({ id: payload.id }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
    .finally(() => {
      dispatch(changeTodolistEntityStatus({ id: payload.id, status: 'idle' }))
    })
}
export const changeTodolistTitleTC = (payload: { id: string; title: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  _todolistsApi
    .updateTodolist({ id: payload.id, title: payload.title })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(changeTodolistTitle({ id: payload.id, title: payload.title }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
