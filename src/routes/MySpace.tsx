import { Alert, Backdrop, CircularProgress, Grid, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'
import { getWithtToken } from '../api'
import { AxiosResponse } from 'axios'
import { IIMagesDto } from '../dto/image.dto'
import { IImage } from '../interfaces/IImage'
import { Images } from '../components/Images/Images'
import { Image } from '../components/Image/Image'
import { ImageClipBoardBtn } from '../components/ImageActions/ImageClipBoardBtn'
import { ImageDeleteBtn } from '../components/ImageActions/ImageDeleteBtn'
import { NoImagesAvailable } from '../components/NoImagesAvailable/NoImagesAvailable'

const MySpace = (): JSX.Element => {
  const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false)
  const [openDangerAlert, setOpenDangerAlert] = useState<boolean>(false)
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
        ? (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
          )
        : (
          <>
            {(images.length > 0)
              ? (
                <Grid item xs={12} lg={10}>
                  <Images>
                    {images.map((image) => (
                      <Image key={image._id} image={image}>
                        <ImageClipBoardBtn
                          image={image}
                          setOpenSuccessAlert={setOpenSuccessAlert}
                        />
                        <ImageDeleteBtn
                          image={image}
                          images={images}
                          setImages={setImages}
                          setOpenDangerAlert={setOpenDangerAlert}
                        />
                      </Image>
                    ))}
                  </Images>
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
                <NoImagesAvailable />
                )}
          </>
          )}
    </Grid>
  )
}

export { MySpace }
