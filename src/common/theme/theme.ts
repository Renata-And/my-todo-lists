import { createTheme } from '@mui/material/styles'
import type { ThemeMode } from '../../app/app-reducer'

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#78909c',
      },
      secondary: {
        main: '#ec407a',
      },
    },
    typography: {
      fontFamily: 'Nunito, Roboto, sans-serif',
    },
  })
}
