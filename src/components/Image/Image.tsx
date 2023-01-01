import { ImageListItem, ImageListItemBar } from '@mui/material'
import { IImage } from '../../interfaces/IImage'

const Image = ({ image, children }: { image: IImage, children: JSX.Element[] }): JSX.Element => {
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
            {children}
          </>
            }
      />
    </ImageListItem>
  )
}

export { Image }
