import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { type SyntheticEvent } from 'react'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { selectAppError } from '../../../app/appSelectors'
import { setAppErrorAC } from '../../../app/app-reducer'

export const ErrorSnackBar = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectAppError)

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppErrorAC(null))
  }
  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
