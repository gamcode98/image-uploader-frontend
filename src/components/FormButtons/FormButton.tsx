import { Button } from '@mui/material'
import { FormikProps } from 'formik'
import { LoginFormik, SignUpFormik } from '../../dto/auth.dto'

interface Props {
  loading: boolean
  formik: FormikProps<SignUpFormik> | FormikProps<LoginFormik>
  action: string
}

const FormButton = ({ loading, formik, action }: Props): JSX.Element => {
  return (
    <Button
      variant='contained'
      size='large'
      disabled={loading}
      sx={{ textTransform: 'initial', width: '100%', mb: '1rem' }}
      onClick={() => formik.handleSubmit()}
    >
      {!loading ? action : 'Sending...'}
    </Button>
  )
}

export { FormButton }
