/* eslint-disable react/jsx-indent */
import { Alert, Button } from '@mui/material'
import { Container } from '@mui/system'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignUpFormik } from '../dto/auth.dto'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { postWithoutToken } from '../api'
import axios, { AxiosResponse } from 'axios'
import { Form } from '../components/Forms/Form'
import { Logo } from '../components/Logo/Logo'
import { Email } from '../components/FormFields/Email'
import { Password } from '../components/FormFields/Password'
import { FormButton } from '../components/FormButtons/FormButton'
import { Username } from '../components/FormFields/Username'

const SignUp = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const navigate = useNavigate()

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
        .matches(
          /^(?=.*?[A-ZÀ-Ú])(?=.*?[a-zà-ú])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          'Must contain at least one upper case letter, one lower case letter, one number and one special character'
        )
    }
  }

  const formik = useFormik<SignUpFormik>({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (values) => {
      const { username, email, password } = values
      setLoading(true)

      postWithoutToken('/auth/register', { username, email, password })
        .then(({ data }: AxiosResponse<any>) => {
          console.log(data.response)
          setShowSuccessAlert(true)
          setLoading(false)
          setTimeout(() => {
            setShowSuccessAlert(false)
            navigate('/')
          }, 5000)
        })
        .catch((error: unknown) => {
          if (axios.isAxiosError(error)) {
            console.log({ error })
            const { message } = error.response?.data
            setError(message)
            setTimeout(() => setError(null), 5000)
            setLoading(false)
          }
        })
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
        informComponent={() => <Logo />}
        username={() => <Username formik={formik} />}
        email={() => <Email formik={formik} />}
        password={() => <Password formik={formik} />}
        button={() => <FormButton loading={loading} formik={formik} action='Sign Up' />}
      >

        {showSuccessAlert
          ? <Alert severity='success' sx={{ mb: '1rem' }}>
            Success — <strong>you are registered now, redirecting to login...</strong>
            </Alert>
          : <div />}

        <Button
          variant='text'
          size='small'
          sx={{ textDecoration: 'underline', textTransform: 'initial' }}
          component={Link}
          disabled={loading}
          to='/'
        >
          Do you have an account? Login
        </Button>

      </Form>
    </Container>

  )
}

export { SignUp }
