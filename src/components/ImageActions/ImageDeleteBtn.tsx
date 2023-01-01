import { IconButton } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { deleteWithtToken } from '../../api'
import { AxiosResponse } from 'axios'
import { IServerResponse } from '../../interfaces/IServerResponse'
import { IImage } from '../../interfaces/IImage'

const ImageDeleteBtn = (
  { image, images, setImages, setOpenDangerAlert }:
  { image: IImage, images: IImage[], setImages: React.Dispatch<React.SetStateAction<IImage[]>>, setOpenDangerAlert: React.Dispatch<React.SetStateAction<boolean>> }
): JSX.Element => {
  const handleDeleteImg = (id: string): void => {
    deleteWithtToken(`/images/${id}`)
      .then(({ data }: AxiosResponse<IServerResponse>) => {
        setImages(images.filter(image => image._id !== id))
        setOpenDangerAlert(prev => !prev)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <IconButton
      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
      aria-label={`info about ${image.name}`}
      onClick={() => handleDeleteImg(image._id)}
    >
      <DeleteForeverIcon sx={{ width: '1.7rem', height: '1.7rem' }} />
    </IconButton>
  )
}

export { ImageDeleteBtn }
