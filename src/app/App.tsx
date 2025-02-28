import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from 'common/theme/theme'
import { ErrorSnackBar, Header } from 'common/components'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { Routing } from 'common/routing'
import { useEffect } from 'react'
import { initializeAppTC, selectIsInitialized } from '../features/auth/model/authSlice'
import CircularProgress from '@mui/material/CircularProgress'
import s from './app.module.css'
import { selectThemeMode } from './appSlice'

const App = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(selectIsInitialized)
  const themeMode = useAppSelector(selectThemeMode)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

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
