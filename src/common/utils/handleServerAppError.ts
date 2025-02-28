import { setAppError, setAppStatus } from '../../app/appSlice'
import type { Dispatch } from 'redux'
import type { BaseResponse } from '../../features/todolists/api/todolistsApi.types'

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }))
  } else {
    dispatch(setAppError({ error: 'Some error occurred' }))
  }
  dispatch(setAppStatus({ status: 'failed' }))
}
