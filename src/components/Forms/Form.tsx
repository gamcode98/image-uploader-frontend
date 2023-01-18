import { Alert, Paper, Stack } from '@mui/material'

interface Props {
  children?: JSX.Element | JSX.Element[]
  error: string | null
  informComponent?: () => JSX.Element
  username?: () => JSX.Element
  email?: () => JSX.Element
  password?: () => JSX.Element
  oldPassword?: () => JSX.Element
  newPassword?: () => JSX.Element
  confirmPassword?: () => JSX.Element
  button: () => JSX.Element
  [x: string]: any
}

const Form = (props: Props): JSX.Element => {
  const { children, error, informComponent, username, email, password, oldPassword, newPassword, confirmPassword, button, ...rest } = props

  return (
    <Paper
      elevation={2}
      sx={{ padding: '1rem', borderRadius: '.5rem' }}
      component='form'
      {...rest}
    >
      {informComponent?.()}
      <Stack spacing={2} marginBottom='1rem'>
        {username?.()}
        {email?.()}
        {password?.()}
        {oldPassword?.()}
        {newPassword?.()}
        {confirmPassword?.()}
        {error !== null && (<Alert severity='error'>{error}</Alert>)}
        {button()}
      </Stack>
      {children}
    </Paper>
  )
}

export { Form }
