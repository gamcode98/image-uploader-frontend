import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
// eslint-disable-next-line import/no-absolute-path
import ImageUploader from '/image.svg'

const UploadImage = (): JSX.Element => {
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
        component='form'
        elevation={3}
        sx={{
          p: '2rem',
          width: '80%',
          borderRadius: '.5rem'
        }}
      >
        <Typography
          variant='h5'
          textAlign='center'
          component='h1'
          mb='1.5rem'
        >Upload your image
        </Typography>

        <Typography
          variant='body1'
          textAlign='center'
          component='p'
          fontWeight={300}
          mb='1.5rem'
          color='#828282'
        >File should be Jpeg, Png...
        </Typography>

        <Stack
          spacing={4}
          sx={{
            border: '2px dashed #97BEF4',
            p: '2rem',
            borderRadius: '.5rem',
            backgroundColor: '#F6F8FB',
            mb: '1rem'
          }}
        >
          <Box
            component='img'
            src={ImageUploader}
            alt='image uploader.'
            sx={{ display: 'block', width: '150px', mx: 'auto' }}
          />

          <Typography
            variant='body1'
            textAlign='center'
            component='p'
            fontWeight={300}
            mb='1rem'
            color='#BDBDBD'
          >Drag & Drop your image here
          </Typography>

        </Stack>

        <Typography
          variant='body1'
          textAlign='center'
          component='p'
          fontWeight={300}
          mb='1rem'
          color='#BDBDBD'
        >Or
        </Typography>

        <Button
          variant='contained'
          component='label'
          sx={{
            display: 'block',
            width: '50%',
            marginX: 'auto',
            textAlign: 'center',
            borderRadius: '.5rem',
            textTransform: 'initial',
            fontSize: '1rem'
          }}
        >
          Choose a file
          <input type='file' hidden />
        </Button>

      </Paper>
    </Container>
  )
}

export { UploadImage }
