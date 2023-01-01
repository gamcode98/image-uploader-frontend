import { Button, Grid, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const NoImagesAvailable = (): JSX.Element => {
  return (
    <Grid item xs={10} lg={3} mt={20}>
      <Paper
        elevation={3}
        sx={{ p: '1.5rem' }}
      >
        <Typography variant='h5' align='center' mb='1rem'>
          There are not images available
        </Typography>
        <Button
          variant='contained'
          size='large'
          sx={{
            display: 'block',
            mx: 'auto',
            textTransform: 'initial',
            fontSize: '1rem',
            textAlign: 'center'
          }}
          component={Link}
          to='/upload-image'
        >
          Click here to add one
        </Button>
      </Paper>
    </Grid>
  )
}

export { NoImagesAvailable }
