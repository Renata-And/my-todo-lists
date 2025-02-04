import type { Dispatch } from 'redux'
import { authApi } from '../api/authApi'
import type { LoginArgs } from '../api/authApi.types'
import { ResultCode } from 'common/enums'
import { setAppStatusAC } from '../../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
import { clearTodolistsDataAC } from '../../todolists/model/todolists-reducer'

type InitialStateType = typeof InitialState

const InitialState = {
  isLoggedIn: false,
  isInitialized: false,
}

export const authReducer = (state: InitialStateType = InitialState, action: ActionsType) => {
  switch (action.type) {
    case 'SET_IS_LOGGED_IN': {
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    }
    case 'SET_IS_INITIALIZED':
      return { ...state, isInitialized: action.payload.isInitialized }
    default:
      return state
  }
}

// Thunks
export const setIsLoggedInTC = (payload: LoginArgs) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authApi
    .login(payload)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(true))
        localStorage.setItem('token', res.data.data.token)
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(false))
        localStorage.removeItem('token')
        dispatch(setAppStatusAC('succeeded'))
        dispatch(clearTodolistsDataAC())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
    })
}
// Action creators
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: 'SET_IS_LOGGED_IN', payload: { isLoggedIn } } as const
}
export const setIsInitializedAC = (isInitialized: boolean) => {
  return { type: 'SET_IS_INITIALIZED', payload: { isInitialized } } as const
}
// Action types
type SetIsLoggedIn = ReturnType<typeof setIsLoggedInAC>
type SetIsInitialized = ReturnType<typeof setIsInitializedAC>
export type ActionsType = SetIsLoggedIn | SetIsInitialized
