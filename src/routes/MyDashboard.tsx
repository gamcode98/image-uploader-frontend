import { Typography } from '@mui/material'
import { Container } from '@mui/system'

const MyDashboard = (): JSX.Element => {
  return (
    <Container>
      <Typography
        component='h2'
        variant='h3'
        textAlign='center'
      >My Dashboard
      </Typography>
    </Container>
  )
}

export { MyDashboard }
