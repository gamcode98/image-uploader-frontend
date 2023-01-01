import { Alert, Button, CircularProgress, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Paper, Snackbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { deleteWithtToken, getWithtToken } from '../api'
import { AxiosResponse } from 'axios'
import { IIMagesDto } from '../dto/image.dto'
import { IImage } from '../interfaces/IImage'
import { Link } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { IServerResponse } from '../interfaces/IServerResponse'

const MySpace = (): JSX.Element => {
  const [images, setImages] = useState<IImage[]>([])
  const [openDangerAlert, setOpenDangerAlert] = useState<boolean>(false)
  const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const matches = useMediaQuery('(min-width:500px)')

  useEffect(() => {
    setLoading(true)
    getWithtToken('/images')
      .then(({ data }: AxiosResponse<IIMagesDto>) => {
        console.log({ data })
        setImages(data.response)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleDeleteImg = (id: string): void => {
    deleteWithtToken(`/images/${id}`)
      .then(({ data }: AxiosResponse<IServerResponse>) => {
        setImages(images.filter(image => image._id !== id))
        setOpenDangerAlert(true)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleClipBoard = (url: string): void => {
    void navigator.clipboard.writeText(url)
      .then(() => setOpenSuccessAlert(true))
  }

  return (
    <Grid
      container
      justifyContent='space-evenly'
      alignItems='center'
      spacing={1}
    >
      {loading
        ? (<CircularProgress />)
        : (
          <>
            {images.length > 0
              ? (
                <Grid item xs={12} lg={10}>
                  <ImageList
                    variant='masonry'
                    cols={matches ? 2 : 1}
                  >
                    {images.map((image) => (
                      <ImageListItem cols={4} key={image._id}>
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
                            <>
                              <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${image.name}`}
                                onClick={() => handleClipBoard(image.path)}
                              >
                                <ContentPasteIcon sx={{ width: '1.5rem', height: '1.5rem' }} />
                              </IconButton>
                              <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${image.name}`}
                                onClick={() => handleDeleteImg(image._id)}
                              >
                                <DeleteForeverIcon sx={{ width: '1.7rem', height: '1.7rem' }} />
                              </IconButton>
                            </>
                          }
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                  <Snackbar
                    open={openSuccessAlert} autoHideDuration={6000}
                    onClose={() => setOpenSuccessAlert(false)}
                  >
                    <Alert onClose={() => setOpenSuccessAlert(false)} severity='success' sx={{ width: '100%' }}>
                      Url copied successfully!
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={openDangerAlert} autoHideDuration={6000}
                    onClose={() => setOpenDangerAlert(false)}
                  >
                    <Alert onClose={() => setOpenDangerAlert(false)} severity='error' sx={{ width: '100%' }}>
                      Image deleted successfully!
                    </Alert>
                  </Snackbar>
                </Grid>

                )
              : (
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
                )}
          </>
          )}
    </Grid>
  )
}

export { MySpace }
