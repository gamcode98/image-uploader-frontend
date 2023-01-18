import { IconButton } from '@mui/material'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { IImage } from '../../interfaces/IImage'

interface Alert {
  successAlert: boolean
  dangerAlert: boolean
}

interface Props {
  image: IImage
  setOpenAlert: React.Dispatch<React.SetStateAction<Alert>>
  openAlert: Alert
}

const ImageClipBoardBtn = (props: Props): JSX.Element => {
  const { image, setOpenAlert, openAlert } = props

  const handleClipBoard = (url: string): void => {
    void navigator.clipboard.writeText(url)
      .then(() => setOpenAlert({ ...openAlert, successAlert: true }))
  }

  return (
    <IconButton
      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
      aria-label={`info about ${image.name}`}
      onClick={() => handleClipBoard(image.path)}
    >
      <ContentPasteIcon sx={{ width: '1.5rem', height: '1.5rem' }} />
    </IconButton>
  )
}

export { ImageClipBoardBtn }
