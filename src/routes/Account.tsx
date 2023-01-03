import { Grid, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { FormButton } from '../components/FormButtons/FormButton'
import { Email } from '../components/FormFields/Email'
import { Username } from '../components/FormFields/Username'
import * as Yup from 'yup'
import { useContext, useState } from 'react'
import { UpdateFormik } from '../dto/auth.dto'
import { Form } from '../components/Forms/Form'
import { UserContext } from '../context/UserContext'
import { patchWithtToken } from '../api'
import axios, { AxiosResponse } from 'axios'
import { EditProfile } from '../components/EditProfile/EditProfile'
import { ChangePassword } from '../components/ChangePassword/ChangePassword'
import { DeleteAccount } from '../components/DeleteAccount/DeleteAccount'

const Account = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const { currentUser } = useContext(UserContext)

  const initialValues = (): UpdateFormik => {
    return {
      username: currentUser.username,
      email: currentUser.email
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
        .matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'Must be a valid email address')
    }
  }

  const formik = useFormik<UpdateFormik>({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (values) => {
      const { username, email } = values
      setLoading(!loading)

      patchWithtToken('/users', { username, email })
        .then(({ data }: AxiosResponse<any>) => {
          console.log(data.response)
          // setToken(data.response.token)
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
    <Grid
      container
      justifyContent='center'
      spacing={4}
      mt='2rem'
    >
      <Grid item xs={12} md={4}>
        <EditProfile currentUser={currentUser}>
          <ChangePassword />
        </EditProfile>
      </Grid>
      <Grid item xs={12} md={4}>
        <Form
          error={error}
          username={() => <Username formik={formik} />}
          email={() => <Email formik={formik} />}
          button={() => <FormButton loading={loading} formik={formik} action='Update' />}
        >
          <Typography variant='body2' textAlign='center' mb='1rem'>Or</Typography>
          <DeleteAccount />
        </Form>
      </Grid>
    </Grid>
  )
}

export { Account }
