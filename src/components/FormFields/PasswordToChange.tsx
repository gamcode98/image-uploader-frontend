import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { FormikProps } from 'formik'
import { useState } from 'react'
import { ChangePasswordForgotFormik, ChangePasswordFormik } from '../../dto/auth.dto'

interface Props {
  formik: FormikProps<ChangePasswordFormik>
  field: keyof ChangePasswordFormik
}

const PasswordToChange = ({ formik, field }: Props): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleClickShowPassword = (): void => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  const labelTexts = {
    oldPassword: 'Old Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password'
  }

  return (
    <TextField
      id={field}
      label={labelTexts[field]}
      variant='outlined'
      fullWidth
      error={(formik.touched[field] ?? false) && Boolean(formik.errors[field])}
      value={formik.values[field]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      helperText={(formik.touched[field] ?? false) && (formik.errors[field] !== null) &&
              formik.errors[field]}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
              type='button'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

export { PasswordToChange }
