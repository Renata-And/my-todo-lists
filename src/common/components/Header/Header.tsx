import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Switch from '@mui/material/Switch'
import Toolbar from '@mui/material/Toolbar'
import { MenuButton } from 'common/components'
import { ResultCode } from 'common/enums'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { PATH } from 'common/routing/Routing'
import { useLogoutMutation } from 'features/auth/api/authApi'
import { clearTasksData } from 'features/todolists/model/tasksSlice'
import { clearTodolistsData } from 'features/todolists/model/todolistsSlice'
import { useNavigate } from 'react-router'
import { changeTheme, selectAppStatus, selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from '../../../app/appSlice'

export const Header = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()

  const changeModeHandler = () => {
    dispatch(changeTheme({ theme: themeMode === 'light' ? 'dark' : 'light' }))
  }

  const logoutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        localStorage.removeItem('token')
        dispatch(clearTodolistsData())
        dispatch(clearTasksData())
      }
    })
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
