import { useAppSelector } from 'common/hooks'
import { Navigate, Outlet } from 'react-router'
import { PATH } from 'common/routing/Routing'
import { selectIsLoggedIn } from 'app/appSlice'

export const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return <>{isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />}</>
}
