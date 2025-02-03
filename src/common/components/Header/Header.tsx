import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LinearProgress from '@mui/material/LinearProgress'
import { MenuButton } from 'common/components'
import Switch from '@mui/material/Switch'
import { changeThemeAC } from '../../../app/app-reducer'
import { getTheme } from 'common/theme'
import { useAppDispatch } from 'common/hooks'
import { useAppSelector } from 'common/hooks'
import { selectAppStatus, selectThemeMode } from '../../../app/appSelectors'

export const Header = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const theme = getTheme(themeMode)
  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
  }
  return (
    <AppBar position={'static'} sx={{ mb: '20px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          <MenuButton>Login</MenuButton>
          <MenuButton>Logout</MenuButton>
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={'secondary'} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === 'loading' && <LinearProgress color={'secondary'} />}
    </AppBar>
  )
}
