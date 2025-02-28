import CircularProgress from '@mui/material/CircularProgress'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ErrorSnackBar, Header } from 'common/components'
import { ResultCode } from 'common/enums'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { Routing } from 'common/routing'
import { getTheme } from 'common/theme/theme'
import { useMeQuery } from 'features/auth/api/authApi'
import { useEffect, useState } from 'react'
import s from './app.module.css'
import { selectThemeMode, setIsLoggedIn } from './appSlice'

const App = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const [isInitialized, setIsInitialized] = useState(false)
  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading, data])

  if (!isInitialized) {
    return (
      <ThemeProvider theme={getTheme(themeMode)}>
        <div className={s.circularProgressContainer}>
          <CircularProgress size={'150px'} color={'primary'} />
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackBar />
    </ThemeProvider>
  )
}

export default App
