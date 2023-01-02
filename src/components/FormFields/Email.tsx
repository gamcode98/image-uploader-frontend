import { TextField } from '@mui/material'
import { FormikProps } from 'formik'
import { LoginFormik, SignUpFormik } from '../../dto/auth.dto'

interface Props {formik: FormikProps<SignUpFormik> | FormikProps<LoginFormik>}

const Email = ({ formik }: Props): JSX.Element => {
  return (
    <TextField
      id='email'
      label='Email'
      variant='outlined'
      fullWidth
      error={(Boolean((formik.touched.email ?? false))) && Boolean(formik.errors.email)}
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      helperText={(Boolean((formik.touched.email ?? false))) && (formik.errors.email !== null) &&
              formik.errors.email}
    />
  )
}

export { Email }
