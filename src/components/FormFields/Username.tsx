import { TextField } from '@mui/material'
import { FormikProps } from 'formik'
import { SignUpFormik, UpdateFormik } from '../../dto/auth.dto'

interface Props { formik: FormikProps<SignUpFormik> | FormikProps<UpdateFormik> }

const Username = ({ formik }: Props): JSX.Element => {
  return (
    <TextField
      id='username'
      label='Username'
      variant='outlined'
      fullWidth
      error={(formik.touched.username ?? false) && Boolean(formik.errors.username)}
      value={formik.values.username}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      helperText={(formik.touched.username ?? false) && (formik.errors.username !== null) &&
              formik.errors.username}
    />
  )
}

export { Username }
