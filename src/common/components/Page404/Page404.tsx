import Button from '@mui/material/Button'
import s from './page404.module.css'
import { PATH } from 'common/routing/Routing'
import { Link } from 'react-router'

export const Page404 = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <Button component={Link} to={PATH.MAIN} variant={'contained'} color={'secondary'}>
        Main page
      </Button>
    </div>
  )
}
