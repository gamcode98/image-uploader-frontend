/* eslint-disable react/jsx-handler-names */
import { TextField } from '@mui/material'
import { useField } from 'formik'

interface Props { name: string }

const Email = ({ name }: Props): JSX.Element => {
  const [field, meta] = useField(name)

  return (
    <TextField
      id='email'
      label='Email'
      variant='outlined'
      fullWidth
      error={(meta.touched ?? false) && Boolean(meta.error)}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      helperText={(Boolean((meta.touched ?? false))) && (meta.error !== null) &&
              meta.error}
    />
  )
}

export { Email }
