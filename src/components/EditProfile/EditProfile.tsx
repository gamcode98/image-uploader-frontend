import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { UpdateFormik } from '../../dto/auth.dto'

interface Props {
  currentUser: UpdateFormik
  children: JSX.Element
}

const EditProfile = ({ currentUser, children }: Props): JSX.Element => {
  return (
    <Paper elevation={2} sx={{ p: '1rem' }}>
      <Typography variant='h6' textAlign='center' mb='1rem' fontWeight='bold'>
        Edit profile
      </Typography>
      <Box
        component='img'
        alt={currentUser.username}
        sx={{
          backgroundColor: '#bdbdbe',
          borderRadius: '100%',
          display: 'block',
          mx: 'auto',
          width: '200px',
          mb: '1rem'
        }}
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        src={`https://robohash.org/${currentUser.username}`}
      />
      {children}
    </Paper>
  )
}

export { EditProfile }
