import { Container, Paper, Stack, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { Form } from '../components/Forms/Form'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ChangePasswordForgotFormik, ChangePasswordFormik } from '../dto/auth.dto'
import { PasswordToChange } from '../components/FormFields/PasswordToChange'
import { FormButton } from '../components/FormButtons/FormButton'
import { patchWithtToken } from '../api'
import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'

const ChangePassword = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')

  const validationSchema = (): Yup.InferType<any > => {
    return {
      newPassword: Yup.string()
        .min(7, 'Too Short!')
        .max(17, 'Too Long!')
        .required('This field is required')
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          'Must contain at least one upper case English letter, one lower case English letter, one number and one special character'
        ),
      confirmPassword: Yup.string().required('Password confirmation is required').when('newPassword', {
        is: (val: string | any[]) => (!!((Boolean(val)) && val.length > 0)),
        then: Yup.string().oneOf(
          [Yup.ref('newPassword')],
          'Both passwords must match'
        )
      })
    }
  }

  const initialValues = (): ChangePasswordForgotFormik => {
    return {
      newPassword: '',
      confirmPassword: ''
    }
  }

  const formik = useFormik<ChangePasswordForgotFormik>({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (values) => {
      const { newPassword, confirmPassword } = values
      // setLoading(!loading)

      patchWithtToken('/users', { newPassword, confirmPassword })
        .then(({ data }: AxiosResponse<any>) => {
          console.log(data.response)
          // setToken(data.response.token)
        })
        .catch((error: unknown) => {
          if (axios.isAxiosError(error)) {
            console.log({ error })
            const { message } = error.response?.data
            // setError(message)
            // setTimeout(() => setError(null), 5000)
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
      <Paper elevation={2} sx={{ p: '1rem' }}>
        <Stack spacing={2}>
          <Typography
            variant='h6'
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            Create a new password
          </Typography>
          <Typography
            variant='body1'
            sx={{ textAlign: 'center' }}
          >
            Enter the password you would like to change your password.
          </Typography>
          <PasswordToChange formik={formik} field='newPassword' />
          <PasswordToChange formik={formik} field='confirmPassword' />
          <FormButton loading={loading} formik={formik} action='Save' />
        </Stack>
      </Paper>
    </Container>
  )
}

export { ChangePassword }
