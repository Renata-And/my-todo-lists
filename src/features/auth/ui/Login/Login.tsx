import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import { ResultCode } from 'common/enums'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { PATH } from 'common/routing/Routing'
import { getTheme } from 'common/theme'
import { useLoginMutation } from 'features/auth/api/authApi'
import { useEffect } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from '../../../../app/appSlice'
import s from './login.module.css'
import { useLazyGetCaptchaUrlQuery } from '../../../security/api/securityApi'
import type { LoginArgs } from '../../api/authApi.types'

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const navigate = useNavigate()
  const [login] = useLoginMutation()
  const [trigger, { data: captcha }] = useLazyGetCaptchaUrlQuery()

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
  } = useForm<LoginArgs>({
    defaultValues: { email: '', password: '', rememberMe: false, captcha: '' },
  })

  const onSubmit: SubmitHandler<LoginArgs> = (data) => {
    login(data)
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
          localStorage.setItem('token', res.data.data.token)
        } else if (res.data?.resultCode === 10) {
          trigger()
        }
      })
      .finally(() => {
        reset()
      })
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
                    value: 4,
                    message: 'The password must be at least 4 characters long.',
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
              {captcha?.url && <img src={captcha.url} alt={'captcha'} />}
              {captcha?.url && (
                <TextField
                  label="Captcha symbols"
                  margin="normal"
                  {...register('captcha', {
                    required: 'Enter the characters from the picture',
                  })}
                />
              )}
              {errors.captcha && <span className={s.errorMessage}>{errors.captcha.message}</span>}
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
