import { Alert, Box, Button, Paper, Skeleton, Snackbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getWithtToken } from '../api'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { IIMageDto } from '../dto/image.dto'

const ImageDetail = (): JSX.Element => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const params = useParams<string>()

  useEffect(() => {
    if (params.id !== undefined) {
      getWithtToken(`/images/${params.id}`)
        .then(({ data }: AxiosResponse<IIMageDto>) => {
          console.log({ data })
          setImageUrl(data.response.path)
        })
        .catch((error: unknown) => {
          if (axios.isAxiosError(error)) {
            console.log(error)
          }
        })
    }
  }, [])

  const handleClipBoard = (url: string): void => {
    void navigator.clipboard.writeText(url)
      .then(() => setOpen(true))
  }

  const handleClose = (): void => setOpen(false)

  return (
    <Container
      maxWidth='sm'
      sx={{
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: '2rem',
          width: '80%',
          borderRadius: '.5rem'
        }}
      >
        <CheckCircleIcon
          color='success'
          sx={{
            width: '3rem',
            height: '3rem',
            display: 'block',
            mx: 'auto',
            mb: '1rem'
          }}
        />
        <Typography
          variant='h6'
          textAlign='center'
          component='h1'
          mb='1.5rem'
        >Uploaded Successfully!
        </Typography>
        {imageUrl === null
          ? (
            <Skeleton
              animation='wave'
              variant='rounded'
              width='100%'
              height='330px'
              sx={{ mb: '1.5rem' }}
            />

            )
          : <Box
              component='img'
              src={imageUrl}
              alt='image uploaded.'
              sx={{ display: 'block', width: '100%', borderRadius: '.5rem', mb: '1.5rem' }}
            />}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '.5rem',
            width: '100%',
            border: '1px solid #E0E0E0',
            backgroundColor: '#F6F8FB',
            borderRadius: '.5rem'
          }}
        >
          <Typography
            variant='body2'
            sx={{
              padding: '.5rem',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              color: '#4F4F4F'
            }}
          >
            {imageUrl}
          </Typography>
          <Button
            variant='contained'
            size='small'
            sx={{
              padding: '.5rem',
              textTransform: 'initial',
              width: '200px'
            }}
            onClick={() => handleClipBoard(imageUrl)}
          >Copy Link
          </Button>
        </Box>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Url copied successfully!
        </Alert>
      </Snackbar>
    </Container>
  )
}

export { ImageDetail }
