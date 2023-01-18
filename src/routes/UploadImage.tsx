import { Box, Button, LinearProgress, Paper, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosProgressEvent, AxiosResponse } from 'axios'
// eslint-disable-next-line import/no-absolute-path
import ImageUploader from '/image.svg'
import { IIMageDto } from '../dto/image.dto'
import { postWithtToken } from '../api'

const UploadImage = (): JSX.Element => {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()
  }

  const uploadImage = (file: File | undefined): void => {
    const formData = new FormData()

    if (file !== undefined) {
      formData.append('file', file)
      setIsLoading(true)

      postWithtToken('/images/upload', formData,
        (progressEvent: AxiosProgressEvent) => {
          const { loaded, total } = progressEvent

          if (total !== undefined) {
            const percent = Math.round((loaded * 100) / total)
            setProgress(percent)
            console.log({ percent })
          }
        })
        .then(({ data }: AxiosResponse<IIMageDto>) => {
          navigate(`/image-detail/${data.response._id}`)
        }).catch((error: unknown) => {
          if (axios.isAxiosError(error)) {
            console.log(error)
          }
        }).finally(() => {
          setProgress(0)
          setIsLoading(false)
        })
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files[0]
    uploadImage(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    uploadImage(file)
  }

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

      {!isLoading
        ? (
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
              component='div'
              sx={{
                border: '2px dashed #97BEF4',
                p: '2rem',
                borderRadius: '.5rem',
                backgroundColor: '#F6F8FB',
                mb: '1rem'
              }}
              draggable
              onDragOver={(e) => handleDragOver(e)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDrop={(e) => handleDrop(e)}
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
              <input
                type='file'
                hidden
                onChange={(e) => handleChange(e)}
              />
            </Button>

          </Paper>
          )

        : (
          <Paper
            elevation={3}
            sx={{
              p: '1.5rem',
              width: '80%',
              borderRadius: '.5rem'
            }}
          >
            <Typography
              mb='1rem'
            >
              Uploading...
            </Typography>
            <LinearProgress variant='determinate' value={progress} />
          </Paper>
          )}

    </Container>
  )
}

export { UploadImage }
