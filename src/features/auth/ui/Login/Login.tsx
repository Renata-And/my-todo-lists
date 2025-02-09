import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid2'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { selectThemeMode } from '../../../../app/appSelectors'
import { getTheme } from 'common/theme'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import s from './login.module.css'
import { setIsLoggedInTC } from '../../model/auth-reducer'
import { selectIsLoggedIn } from '../../model/authSelectors'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { PATH } from 'common/routing/Routing'

type Inputs = {
  email: string
  password: string
  rememberMe: boolean
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate(PATH.MAIN)
    }
  }, [isLoggedIn])

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(setIsLoggedInTC(data))
    reset()
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: '5px' }}
                href={'https://social-network.samuraijs.com/'}
                target={'_blank'}
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Incorrect email address',
                  },
                })}
              />
              {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 5,
                    message: 'The password must be at least 6 characters long.',
                  },
                })}
              />
              {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Controller
                    name={'rememberMe'}
                    control={control}
                    render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                  />
                }
              />
              <Button type={'submit'} variant={'contained'} color={'secondary'}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
