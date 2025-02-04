import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LinearProgress from '@mui/material/LinearProgress'
import { MenuButton } from 'common/components'
import Switch from '@mui/material/Switch'
import { changeThemeAC } from '../../../app/app-reducer'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { selectAppStatus, selectThemeMode } from '../../../app/appSelectors'
import { selectIsLoggedIn } from '../../../features/auth/model/authSelectors'
import { logoutTC } from '../../../features/auth/model/auth-reducer'
import { useNavigate } from 'react-router'
import { PATH } from 'common/routing/Routing'

export const Header = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  const faqHandler = () => {
    navigate(PATH.FAQ)
  }

  return (
    <AppBar position={'static'} sx={{ mb: '20px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && <MenuButton onClick={faqHandler}>FAQ</MenuButton>}
          {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
          <Switch color={'secondary'} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === 'loading' && <LinearProgress color={'secondary'} />}
    </AppBar>
  )
}
