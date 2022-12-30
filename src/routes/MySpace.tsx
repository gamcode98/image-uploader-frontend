import { Box, Button, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Paper, Skeleton, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { useEffect, useState } from 'react'
import { getWithtToken } from '../api'
import { AxiosResponse } from 'axios'
import { IIMagesDto } from '../dto/image.dto'
import { IImage } from '../interfaces/IImage'

const MySpace = (): JSX.Element => {
  const [images, setImages] = useState<IImage[]>([])
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    getWithtToken('/images')
      .then(({ data }: AxiosResponse<IIMagesDto>) => {
        console.log({ data })
        setImages(data.response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleClick = (path: string): void => setImageUrl(path)

  return (
    <Grid
      container
      justifyContent='space-evenly'
      alignItems='center'
      spacing={1}
    >
      <Grid item xs={12} lg={7}>
        <ImageList
          sx={{
            height: {
              xs: 200,
              md: 300,
              lg: '85vh'
            }
          }}
        >
          {images.map((image) => (
            <ImageListItem key={image._id}>
              <img
                src={`${image.path}?w=248&fit=crop&auto=format`}
                srcSet={`${image.path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={image.name}
                loading='lazy'
              />
              <ImageListItemBar
                title={image.name}
                subtitle={image.name}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${image.name}`}
                    onClick={() => handleClick(image.path)}
                  >
                    <InfoIcon />
                  </IconButton>
            }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
      <Grid item lg={4} sx={{ display: { xs: 'none', lg: 'block' } }}>
        {/* <Box>
          <Typography variant='h5' sx={{ mb: 1 }}>
            Select any image to show actions...
          </Typography>
        </Box> */}
        <Paper
          elevation={3}
          sx={{
            p: '2rem',
            width: '80%',
            borderRadius: '.5rem'
          }}
        >

          <Typography
            variant='h6'
            textAlign='center'
            component='h1'
            mb='1.5rem'
          >Select any image to show actions...
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
            >Copy Link
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export { MySpace }
