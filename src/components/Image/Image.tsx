import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { AxiosResponse } from 'axios'
import { IServerResponse } from '../interfaces/IServerResponse'
import { IImage } from '../../interfaces/IImage'
import { useState } from 'react'
import { deleteWithtToken } from '../../api'

const Image = ({ images, setImages, image }: { images: IImage[], setImages: any, image: IImage }): JSX.Element => {
  const [openDangerAlert, setOpenDangerAlert] = useState<boolean>(false)
  const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false)

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
  )
}

export { Image }
