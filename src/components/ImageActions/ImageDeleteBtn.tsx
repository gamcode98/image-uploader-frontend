import { IconButton } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { deleteWithtToken } from '../../api'
import { AxiosResponse } from 'axios'
import { IServerResponse } from '../../interfaces/IServerResponse'
import { IImage } from '../../interfaces/IImage'

interface Alert {
  successAlert: boolean
  dangerAlert: boolean
}

interface Props {
  image: IImage
  images: IImage[]
  setImages: React.Dispatch<React.SetStateAction<IImage[]>>
  setOpenAlert: React.Dispatch<React.SetStateAction<Alert>>
  openAlert: Alert
}

const ImageDeleteBtn = (props: Props): JSX.Element => {
  const { image, images, setImages, setOpenAlert, openAlert } = props

  const handleDeleteImg = (id: string): void => {
    deleteWithtToken(`/images/${id}`)
      .then(({ data }: AxiosResponse<IServerResponse>) => {
        setOpenAlert({ ...openAlert, dangerAlert: true })
        setImages(images.filter(image => image._id !== id))
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
