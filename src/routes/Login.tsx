import { Button, Stack } from '@mui/material'
import { Container } from '@mui/system'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postWithoutToken } from '../api'
import { Formik, FormikProps, useFormik } from 'formik'
import * as Yup from 'yup'
import axios, { AxiosResponse } from 'axios'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ILoginDto } from '../dto/auth.dto'
import { Email } from '../components/FormFields/Email'
import { Password } from '../components/FormFields/Password'
import { FormButton } from '../components/FormButtons/FormButton'
import { Logo } from '../components/Logo/Logo'
import { UserContext } from '../context/UserContext'
import { Form } from '../components/Forms/Form'

const Login = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [, setToken] = useLocalStorage('token', '')

  const navigate = useNavigate()

  const { setCurrentUser } = useContext(UserContext)

  const initialValues = { email: '', password: '' }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('This field is required')
      .matches(
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        'Must be a valid email address'
      ),
    password: Yup.string()
      .min(7, 'Too Short!')
      .max(17, 'Too Long!')
      .required('This field is required')
      .matches(
        /^(?=.*?[A-ZÀ-Ú])(?=.*?[a-zà-ú])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        'Must contain at least one upper case letter, one lower case letter, one number and one special character'
      )

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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const { email, password } = values
          setLoading(!loading)

          postWithoutToken('/auth/login', { email, password })
            .then(({ data }: AxiosResponse<ILoginDto>) => {
              console.log(data.response.user)
              setCurrentUser(data.response.user)
              setToken(data.response.token)
              navigate('/my-space')
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
        }}
      >
        {(formik) => (
          <Form
            onSubmit={formik.handleSubmit}
            informComponent={() => <Logo />}
            error={error}
            email={() => <Email name='email' />}
            password={() =>
              <Password
                name='password' id='password'
                label='Password'
              />}
            button={() => (
              <FormButton loading={loading} action='Login' />
            )}
          >
            <Stack direction='row' justifyContent='space-between'>
              <Button
                variant='text' size='small' type='button'
                sx={{ textDecoration: 'underline', textTransform: 'initial' }}
                component={Link}
                disabled={loading}
                to='/recover-password'
              >
                Forgot password?
              </Button>
              <Button
                variant='text' size='small' type='button'
                sx={{ textDecoration: 'underline', textTransform: 'initial' }}
                component={Link}
                disabled={loading}
                to='/signup'
              >
                Don't have an account? Sign Up
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>

    </Container>
  )
}

export { Login }
