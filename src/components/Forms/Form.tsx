import { Alert, Paper, Stack } from '@mui/material'

interface Props {
  children: JSX.Element | JSX.Element[]
  error: string | null
  logo?: () => JSX.Element
  username?: () => JSX.Element
  email?: () => JSX.Element
  password?: () => JSX.Element
  button: () => JSX.Element
}

const Form = ({ children, error, logo, username, email, password, button }: Props): JSX.Element => {
  return (
    <Paper
      elevation={2}
      sx={{ padding: '1rem', borderRadius: '.5rem' }}
      component='form'
    >
      {logo?.()}
      <Stack spacing={2} marginBottom='1rem'>
        {username?.()}
        {email?.()}
        {password?.()}
        {error !== null && (<Alert severity='error'>{error}</Alert>)}
        {button()}
      </Stack>
      {children}
    </Paper>
  )
}

export { Form }
