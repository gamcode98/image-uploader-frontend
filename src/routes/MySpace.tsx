import { Alert, Button, CircularProgress, Grid, Paper, Snackbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getWithtToken } from '../api'
import { AxiosResponse } from 'axios'
import { IIMagesDto } from '../dto/image.dto'
import { IImage } from '../interfaces/IImage'
import { Link } from 'react-router-dom'
import { Images } from '../components/Images/Images'
import { Image } from '../components/Image/Image'

const MySpace = (): JSX.Element => {
  const [images, setImages] = useState<IImage[]>([])

  const [loading, setLoading] = useState<boolean>(false)

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
                  <Images>
                    {images.map((image: IImage) => (
                      <Image key={image._id} images={images} setImages={setImages} image={image} />
                    ))}
                  </Images>
                  {/* <Snackbar
                    open={openSuccessAlert} autoHideDuration={6000}
                    onClose={() => setOpenSuccessAlert(false)}
                  >
                    <Alert onClose={() => setOpenSuccessAlert(false)} severity='success' sx={{ width: '100%' }}>
                      Url copied successfully!
                    </Alert>
                  </Snackbar> */}
                  {/* <Snackbar
                    open={openDangerAlert} autoHideDuration={6000}
                    onClose={() => setOpenDangerAlert(false)}
                  >
                    <Alert onClose={() => setOpenDangerAlert(false)} severity='error' sx={{ width: '100%' }}>
                      Image deleted successfully!
                    </Alert>
                  </Snackbar> */}
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
