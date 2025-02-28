import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { type SyntheticEvent } from 'react'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { selectAppError, setAppError } from '../../../app/appSlice'

export const ErrorSnackBar = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectAppError)

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppError({ error: null }))
  }
  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
