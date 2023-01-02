import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { FormikProps } from 'formik'
import { useState } from 'react'
import { LoginFormik, SignUpFormik } from '../../dto/auth.dto'

interface Props {formik: FormikProps<SignUpFormik> | FormikProps<LoginFormik>}

const Password = ({ formik }: Props): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleClickShowPassword = (): void => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  return (
    <TextField
      id='password'
      label='Password'
      variant='outlined'
      fullWidth
      error={(formik.touched.password ?? false) && Boolean(formik.errors.password)}
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      helperText={(formik.touched.password ?? false) && (formik.errors.password !== null) &&
              formik.errors.password}
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

export { Password }
