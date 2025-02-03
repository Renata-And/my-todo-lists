import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from 'common/theme/theme'
import { ErrorSnackBar, Header } from 'common/components'
import { Main } from './Main'
import { useAppSelector } from 'common/hooks'
import { selectThemeMode } from './appSelectors'

const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
      <ErrorSnackBar />
    </ThemeProvider>
  )
}

export default App
