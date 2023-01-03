import { Button, Stack } from '@mui/material'
import { Container } from '@mui/system'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postWithoutToken } from '../api'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios, { AxiosResponse } from 'axios'
import { useLocalStorage } from './../hooks/useLocalStorage'
import { ILoginDto, LoginFormik } from '../dto/auth.dto'
import { Form } from '../components/Forms/Form'
import { Email } from '../components/FormFields/Email'
import { Password } from '../components/FormFields/Password'
import { FormButton } from '../components/FormButtons/FormButton'
import { Logo } from '../components/Logo/Logo'
import { UserContext } from '../context/UserContext'

const Login = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [, setToken] = useLocalStorage('token', '')

  const navigate = useNavigate()

  const { setCurrentUser } = useContext(UserContext)

  const initialValues = (): LoginFormik => {
    return {
      email: 'gam@gmail.com',
      password: '456okA#s'
    }
  }

  const validationSchema = (): Yup.InferType<any> => {
    return {
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
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          'Must contain at least one upper case English letter, one lower case English letter, one number and one special character'
        )
    }
  }

  const formik = useFormik<LoginFormik>({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: values => {
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
      <Form
        error={error}
        logo={() => <Logo />}
        email={() => <Email formik={formik} />}
        password={() => <Password formik={formik} />}
        button={() => (
          <FormButton loading={loading} formik={formik} action='Login' />
        )}
      >
        <Stack direction='row' justifyContent='space-between'>
          <Button
            variant='text'
            href='/recovery-password'
            size='small'
            sx={{ textDecoration: 'underline', textTransform: 'initial' }}
            LinkComponent={Link}
          >
            Forgot password?
          </Button>
          <Button
            variant='text'
            size='small'
            sx={{ textDecoration: 'underline', textTransform: 'initial' }}
            component={Link}
            to='/signup'
          >
            Don't have an account? Sign Up
          </Button>
        </Stack>
      </Form>
    </Container>
  )
}

export { Login }
