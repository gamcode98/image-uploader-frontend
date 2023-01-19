import { Alert, Container, Typography } from '@mui/material'
import { Formik } from 'formik'
import { Email } from '../components/FormFields/Email'
import * as Yup from 'yup'
import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { postWithoutToken } from '../api'
import { FormButton } from '../components/FormButtons/FormButton'
import { Form } from '../components/Forms/Form'

const RecoverPassword = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const initialValues = { email: '' }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('This field is required')
      .matches(
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        'Must be a valid email address'
      )
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const { email } = values
          setLoading(!loading)

          postWithoutToken('/auth/recovery', { email })
            .then(({ data }: AxiosResponse<any>) => {
              console.log(data)
              setShowSuccessAlert(true)
              setTimeout(() => setShowSuccessAlert(false), 5000)
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
        {formik => (
          <Form
            onSubmit={formik.handleSubmit}
            error={error}
            informComponent={() => <Inform />}
            email={() => <Email name='email' />}
            button={() => <FormButton loading={loading} action='Submit' />}
          >
            {showSuccessAlert
              ? <Alert severity='success' sx={{ my: '1rem' }}>Email sent!</Alert>
              : <></>}
          </Form>
        )}

      </Formik>
    </Container>
  )
}

export { RecoverPassword }
