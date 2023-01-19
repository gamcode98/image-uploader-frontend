import { Alert, Button } from '@mui/material'
import axios, { AxiosResponse } from 'axios'
import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { patchWithtToken } from '../../api'
import { FormButton } from '../FormButtons/FormButton'
import { Form } from '../Forms/Form'
import { Password } from '../FormFields/Password'

const ChangePassword = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(7, 'Too Short!')
      .max(17, 'Too Long!')
      .required('This field is required')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        'Must contain at least one upper case English letter, one lower case English letter, one number and one special character'
      ),
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
  })

  return (
    <>
      <Button
        variant='text'
        sx={{
          textTransform: 'initial',
          fontWeight: 'bold',
          display: 'block',
          mx: 'auto'
        }}
        onClick={() => setShowChangePassword(true)}
      >
        Change password
      </Button>
      {showChangePassword && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const { oldPassword, newPassword } = values
            setLoading(true)

            patchWithtToken('/users/change-password', { oldPassword, newPassword })
              .then(({ data }: AxiosResponse<any>) => {
                setShowSuccessAlert(true)
                setTimeout(() => {
                  setShowSuccessAlert(false)
                }, 5000)
              })
              .catch((error: unknown) => {
                if (axios.isAxiosError(error)) {
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
              oldPassword={() =>
                <Password name='oldPassword' id='oldPassword' label='Old Password' />}
              newPassword={() =>
                <Password name='newPassword' id='newPassword' label='New Password' />}
              confirmPassword={() =>
                <Password name='confirmPassword' id='confirmPassword' label='Confirm Password' />}
              button={() => (
                <FormButton loading={loading} action='Save' />
              )}
            >
              {showSuccessAlert
                ? <Alert severity='success' sx={{ my: '1rem' }}>Password changed successfully</Alert>
                : <></>}
            </Form>
          )}
        </Formik>
      )}
    </>
  )
}

export { ChangePassword }
