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
import { Link } from 'react-router-dom'

const Login = (): JSX.Element => {
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
        <Stack spacing={2} marginBottom='1rem'>

          <TextField
            id='email'
            label='Email'
            variant='outlined'
            fullWidth
          />

          <TextField
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
            Login
          </Button>
        </Stack>
        <Stack direction='row' justifyContent='space-between'>
          <Button
            variant='text'
            href='/recovery-password'
            size='small'
            sx={{ textDecoration: 'underline', textTransform: 'initial' }}
            LinkComponent={Link}
          >Forgot password?
          </Button>
          <Button
            variant='text'
            href='/signup'
            size='small'
            sx={{ textDecoration: 'underline', textTransform: 'initial' }}
            LinkComponent={Link}
          >
            Don't have an account? Sign Up
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}

export { Login }
