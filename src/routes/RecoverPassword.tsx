import { Container, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { Email } from '../components/FormFields/Email'
import * as Yup from 'yup'
import axios, { AxiosResponse } from 'axios'
import { postWithoutToken } from '../api'
import { useState } from 'react'
import { FormButton } from '../components/FormButtons/FormButton'
import { Form } from '../components/Forms/Form'
import { EmailFormik } from '../dto/auth.dto'

const RecoverPassword = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const initialValues = (): EmailFormik => ({ email: '' })

  const validationSchema = (): Yup.InferType<any> => {
    return {
      email: Yup.string()
        .required('This field is required')
        .matches(
          /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
          'Must be a valid email address'
        )
    }
  }

  const formik = useFormik<EmailFormik>({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: values => {
      const { email } = values
      setLoading(!loading)

      postWithoutToken('/auth/recovery', { email })
        .then(({ data }: AxiosResponse<any>) => {
          console.log(data)
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

  const Inform = (): JSX.Element => {
    return (
      <>
        <Typography
          variant='h6'
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: '1rem' }}
        >
          Password recovery
        </Typography>
        <Typography
          variant='body1'
          sx={{ textAlign: 'center', mb: '1rem' }}
        >
          Inform the email address used to create your account
        </Typography>
      </>
    )
  }

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
        informComponent={() => <Inform />}
        email={() => <Email formik={formik} />}
        button={() => <FormButton loading={loading} formik={formik} action='Submit' />}
      />
    </Container>
  )
}

export { RecoverPassword }
