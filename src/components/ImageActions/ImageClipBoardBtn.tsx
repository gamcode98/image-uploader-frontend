import { IconButton } from '@mui/material'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { IImage } from '../../interfaces/IImage'

const ImageClipBoardBtn = (
  { image, setOpenSuccessAlert }:
  { image: IImage, setOpenSuccessAlert: React.Dispatch<React.SetStateAction<boolean>> }):
JSX.Element => {
  const handleClipBoard = (url: string): void => {
    void navigator.clipboard.writeText(url)
      .then(() => setOpenSuccessAlert(true))
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
