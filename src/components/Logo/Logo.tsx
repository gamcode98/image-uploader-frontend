import CloudIcon from '@mui/icons-material/Cloud'
import { Typography } from '@mui/material'
import { Stack } from '@mui/system'

const Logo = (): JSX.Element => {
  return (
    <Stack direction='row' justifyContent='center' alignItems='center' mt='1rem' mb='2rem'>
      <CloudIcon sx={{ mr: 2, color: 'hsl(210, 79%, 46%)' }} />
      <Typography
        variant='h6'
        noWrap
        sx={{
          mr: 2,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.2rem',
          color: 'hsl(210, 79%, 46%)',
          textDecoration: 'none'
        }}
      >
        tiny cloud
      </Typography>
    </Stack>
  )
}

export { Logo }
