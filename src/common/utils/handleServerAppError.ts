import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import type { Dispatch } from 'redux'
import type { BaseResponse } from '../../features/todolists/api/todolistsApi.types'

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}
