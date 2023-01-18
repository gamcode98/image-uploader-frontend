/* eslint-disable react/jsx-handler-names */
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useField } from 'formik'
import { useState } from 'react'

interface Props {
  name: string
  [x: string]: any
}

const Password = ({ name, ...props }: Props): JSX.Element => {
  const [field, meta] = useField(name)

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleClickShowPassword = (): void => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  return (
    <TextField
      {...props}
      variant='outlined'
      fullWidth
      error={(meta.touched ?? false) && Boolean(meta.error)}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      helperText={(meta.touched ?? false) && (meta.error !== null) &&
              meta.error}
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
