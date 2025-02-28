import type { Dispatch } from 'redux'
import { authApi } from '../api/authApi'
import type { LoginArgs } from '../api/authApi.types'
import { ResultCode } from 'common/enums'
import { setAppStatus } from '../../../app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
import { clearTodolistsData } from '../../todolists/model/todolistsSlice'
import { createSlice } from '@reduxjs/toolkit'
import { clearTasksData } from '../../todolists/model/tasksSlice'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsInitialized: (state) => state.isInitialized,
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn, setIsInitialized } = authSlice.actions
export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors

// Thunks
export const loginTC = (payload: LoginArgs) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  authApi
    .login(payload)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        localStorage.setItem('token', res.data.data.token)
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        localStorage.removeItem('token')
        dispatch(setAppStatus({ status: 'succeeded' }))
        dispatch(clearTodolistsData())
        dispatch(clearTasksData())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }))
    })
}
