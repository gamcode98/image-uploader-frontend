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
  const [images, setImages] = useState<IImage[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState({
    successAlert: false,
    dangerAlert: false
  })

  useEffect(() => {
    setLoading(true)
    getWithtToken('/images')
      .then(({ data }: AxiosResponse<IIMagesDto>) => {
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
                          openAlert={openAlert}
                          setOpenAlert={setOpenAlert}
                        />
                        <ImageDeleteBtn
                          image={image}
                          images={images}
                          setImages={setImages}
                          openAlert={openAlert}
                          setOpenAlert={setOpenAlert}
                        />
                      </Image>
                    ))}
                  </Images>

                  <Snackbar
                    open={openAlert.successAlert} autoHideDuration={6000}
                    onClose={() => setOpenAlert({ ...openAlert, successAlert: false })}
                  >
                    <Alert onClose={() => setOpenAlert({ ...openAlert, successAlert: false })} severity='success' sx={{ width: '100%' }}>
                      Url copied successfully!
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={openAlert.dangerAlert} autoHideDuration={6000}
                    onClose={() => setOpenAlert({ ...openAlert, dangerAlert: false })}
                  >
                    <Alert onClose={() => setOpenAlert({ ...openAlert, dangerAlert: false })} severity='error' sx={{ width: '100%' }}>
                      Image deleted successfully!
                    </Alert>
                  </Snackbar>
                </Grid>
                )
              : (
                <>
                  <NoImagesAvailable />
                  <Snackbar
                    open={openAlert.dangerAlert} autoHideDuration={6000}
                    onClose={() => setOpenAlert({ ...openAlert, dangerAlert: false })}
                  >
                    <Alert onClose={() => setOpenAlert({ ...openAlert, dangerAlert: false })} severity='error' sx={{ width: '100%' }}>
                      Image deleted successfully!
                    </Alert>
                  </Snackbar>
                </>
                )}
          </>
          )}
    </Grid>
  )
}

export { MySpace }
