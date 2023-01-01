import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField
} from '@mui/material'
import { Container } from '@mui/system'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { postWithoutToken } from '../api'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios, { AxiosResponse } from 'axios'
import { useLocalStorage } from './../hooks/useLocalStorage'
import { ILoginDto, LoginFormik } from '../dto/auth.dto'

const Login = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [, setToken] = useLocalStorage('token', '')

  const handleClickShowPassword = (): void => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  const initialValues = (): LoginFormik => {
    return {
      email: 'gam@gmail.com',
      password: '123okA#s'
    }
  }

  const validationSchema = (): Yup.InferType<any > => {
    return {
      email: Yup.string()
        .required('This field is required')
        .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'Must be a valid email address'),
      password: Yup.string()
        .min(7, 'Too Short!')
        .max(17, 'Too Long!')
        .required('This field is required')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Must contain at least one upper case English letter, one lower case English letter, one number and one special character')
    }
  }

  const formik = useFormik<LoginFormik>({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (values) => {
      const { email, password } = values
      setLoading(!loading)

      postWithoutToken('/auth/login', { email, password })
        .then(({ data }: AxiosResponse<ILoginDto>) => {
          console.log(data.response)
          setToken(data.response.token)
          navigate('/my-space')
        })
        .catch((error: unknown) => {
          if (axios.isAxiosError(error)) {
            const { message } = error.response?.data
            setError(message)
            setTimeout(() => setError(null), 5000)
          }
        })
        .finally(() => setLoading(false))
    }

  })

  return (
    <Container
      maxWidth='sm'
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Paper
        elevation={2}
        sx={{ padding: '1rem', borderRadius: '.5rem' }}
        component='form'
      >
        <Stack spacing={2} marginBottom='1rem'>

          <TextField
            id='email'
            label='Email'
            variant='outlined'
            fullWidth
            error={(formik.touched.email ?? false) && Boolean(formik.errors.email)}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={(formik.touched.email ?? false) && (formik.errors.email !== null) &&
              formik.errors.email}
          />

          <TextField
            id='password'
            label='Password'
            variant='outlined'
            fullWidth
            error={(formik.touched.password ?? false) && Boolean(formik.errors.password)}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={(formik.touched.password ?? false) && (formik.errors.password !== null) &&
              formik.errors.password}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                    type='button'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {error !== null && (<Alert severity='error'>{error}</Alert>)}

          <Button
            variant='contained'
            size='large'
            disabled={loading}
            sx={{ textTransform: 'initial' }}
            onClick={() => formik.handleSubmit()}
          >
            {!loading ? 'Login' : 'Sending...'}
          </Button>

        </Stack>
        <Stack direction='row' justifyContent='space-between'>
          <Button
            variant='text'
            href='/recovery-password'
            size='small'
            sx={{ textDecoration: 'underline', textTransform: 'initial' }}
            LinkComponent={Link}
          >Forgot password?
          </Button>
          <Button
            variant='text'
            href='/signup'
            size='small'
            sx={{ textDecoration: 'underline', textTransform: 'initial' }}
            LinkComponent={Link}
          >
            Don't have an account? Sign Up
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}

export { Login }
