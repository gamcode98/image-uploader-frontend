/* eslint-disable react/jsx-handler-names */
import { TextField } from '@mui/material'
import { useField } from 'formik'

interface Props {name: string}

const Username = ({ name }: Props): JSX.Element => {
  const [field, meta] = useField(name)

  return (
    <TextField
      id='username'
      label='Username'
      variant='outlined'
      fullWidth
      error={(meta.touched ?? false) && Boolean(meta.error)}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      helperText={(meta.touched ?? false) && (meta.error !== null) &&
              meta.error}
    />
  )
}

export { Username }
