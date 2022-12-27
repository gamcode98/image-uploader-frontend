import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField
} from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Form = (): JSX.Element => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = (): void => setShowPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault()
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Paper
        elevation={2}
        sx={{ padding: '1rem', borderRadius: '.5rem' }}
        component='form'
      >
        <Stack spacing={2}>
          <TextField
            required
            id='username'
            label='Username'
            variant='outlined'
            fullWidth
          />

          <TextField
            required
            id='email'
            label='Email'
            variant='outlined'
            fullWidth
          />

          <TextField
            required
            id='password'
            label='Password'
            variant='outlined'
            fullWidth
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button variant='contained' size='large' type='submit'>
            Register me
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}

export { Form }
