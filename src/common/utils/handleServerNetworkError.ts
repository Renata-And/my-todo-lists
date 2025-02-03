import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import type { Dispatch } from 'redux'

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC(error.message))
  dispatch(setAppStatusAC('failed'))
}
