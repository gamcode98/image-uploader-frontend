import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Container } from '@mui/system'
import CloudIcon from '@mui/icons-material/Cloud'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { SignUpFormik } from '../dto/auth.dto'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { postWithoutToken } from '../api'
import axios, { AxiosResponse } from 'axios'

const SignUp = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleClickShowPassword = (): void => setShowPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault()
  }

  const initialValues = (): SignUpFormik => {
    return {
      username: '',
      email: '',
      password: ''
    }
  }

  const validationSchema = (): Yup.InferType<any > => {
    return {
      username: Yup.string()
        .required('This field is required')
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/, 'Just letters and whitespace'),
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

  const formik = useFormik<SignUpFormik>({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (values) => {
      const { email, password } = values
      setLoading(!loading)

      postWithoutToken('/auth/signup', { email, password })
        .then(({ data }: AxiosResponse<any>) => {
          console.log(data.response)
          // setToken(data.response.token)
          navigate('/')
        })
        .catch((error: unknown) => {
          if (axios.isAxiosError(error)) {
            console.log({ error })
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
        <Stack direction='row' justifyContent='center' alignItems='center' mt='1rem' mb='2rem'>
          <CloudIcon sx={{ mr: 2, color: 'hsl(210, 79%, 46%)' }} />
          <Typography
            variant='h6'
            noWrap
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'hsl(210, 79%, 46%)',
              textDecoration: 'none'
            }}
          >
            tiny cloud
          </Typography>
        </Stack>
        <Stack spacing={2} mb='1rem'>
          <TextField
            id='username'
            label='Username'
            variant='outlined'
            fullWidth
            error={(formik.touched.username ?? false) && Boolean(formik.errors.username)}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={(formik.touched.username ?? false) && (formik.errors.username !== null) &&
              formik.errors.username}
          />

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
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {error !== null && (<Alert severity='error'>{error}</Alert>)}

          <Button
            variant='contained' size='large' type='submit'
            sx={{ textTransform: 'initial' }}
            disabled={loading}
            onClick={() => formik.handleSubmit()}
          >
            {!loading ? 'Sign Up' : 'Sending...'}
          </Button>
        </Stack>
        <Button
          variant='text'
          size='small'
          sx={{ textDecoration: 'underline', textTransform: 'initial' }}
          component={Link}
          to='/'
        >
          Do you have an account? Login
        </Button>
      </Paper>
    </Container>
  )
}

export { SignUp }
