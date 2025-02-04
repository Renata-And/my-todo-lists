import { Route, Routes } from 'react-router'
import { Login } from '../../features/auth/ui/Login/Login'
import { Main } from '../../app/Main'
import { Page404 } from 'common/components'
import { ProtectedRoute } from 'common/components/ProtectedRoute/ProtectedRoute'
import { Faq } from 'common/components/Faq/Faq'

export const PATH = {
  MAIN: '/',
  LOGIN: '/login',
  FAQ: '/faq',
  NOT_FOUND: '*',
}

export const Routing = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.NOT_FOUND} element={<Page404 />} />
      <Route element={<ProtectedRoute />}>
        <Route path={PATH.MAIN} element={<Main />} />
        <Route path={PATH.FAQ} element={<Faq />} />
      </Route>
    </Routes>
  )
}
