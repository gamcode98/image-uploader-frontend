import { Button } from '@mui/material'
import { FormikProps } from 'formik'
import { ChangePasswordFormik, EmailFormik, LoginFormik, SignUpFormik, UpdateFormik } from '../../dto/auth.dto'

interface Props {
  loading: boolean
  formik: FormikProps<SignUpFormik> | FormikProps<LoginFormik> | FormikProps<UpdateFormik> | FormikProps<ChangePasswordFormik> | FormikProps<EmailFormik>
  action: string
}

const FormButton = ({ loading, formik, action }: Props): JSX.Element => {
  return (
    <Button
      variant='contained'
      size='large'
      disabled={loading}
      sx={{ textTransform: 'initial', width: '100%', mb: '1rem', fontSize: '1rem' }}
      onClick={() => formik.handleSubmit()}
    >
      {!loading ? action : 'Sending...'}
    </Button>
  )
}

export { FormButton }