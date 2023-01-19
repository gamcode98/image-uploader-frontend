import { Alert, Container, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { FormButton } from '../components/FormButtons/FormButton'
import { Form } from '../components/Forms/Form'
import { postWithoutToken } from '../api'
import { Password } from '../components/FormFields/Password'

const ChangePassword = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const initialValues = {
    newPassword: '',
    confirmPassword: ''
  }

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(7, 'Too Short!')
      .max(17, 'Too Long!')
      .required('This field is required')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        'Must contain at least one upper case English letter, one lower case English letter, one number and one special character'
      ),
    confirmPassword: Yup.string()
      .required('Password confirmation is required')
      .when('newPassword', {
        is: (val: string | any[]) => !!(Boolean(val) && val.length > 0),
        then: Yup.string().oneOf(
          [Yup.ref('newPassword')],
          'Both passwords must match'
        )
      })
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
          const { newPassword } = values
          setLoading(true)

          postWithoutToken('/auth/change-password', { newPassword, token })
            .then(({ data }: AxiosResponse<any>) => {
              console.log(data.response)
              setShowSuccessAlert(true)
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
              }
            })
            .finally(() => setLoading(false))
        }}
      >
        {(formik) => (
          <Form
            onSubmit={formik.handleSubmit}
            informComponent={() => (
              <>
                <Typography
                  variant='h6'
                  sx={{ fontWeight: 'bold', textAlign: 'center', mb: '1rem' }}
                >
                  Create a new password
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ textAlign: 'center', mb: '1rem' }}
                >
                  Enter the password you would like to change your password.
                </Typography>
              </>
            )}
            error={error}
            newPassword={() => (
              <Password
                name='newPassword'
                id='newPassword'
                label='New Password'
              />
            )}
            confirmPassword={() => (
              <Password
                name='confirmPassword'
                id='confirmPassword'
                label='Confirm Password'
              />
            )}
            button={() => <FormButton loading={loading} action='Submit' />}
          >
            {showSuccessAlert
              ? <Alert severity='success' sx={{ my: '1rem' }}>Password changed successfully</Alert>
              : <></>}
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export { ChangePassword }
