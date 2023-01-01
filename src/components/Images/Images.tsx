import { ImageList, useMediaQuery } from '@mui/material'

const Images = ({ children }: { children: JSX.Element[] }): JSX.Element => {
  const matches = useMediaQuery('(min-width:500px)')

  return (
    <ImageList
      variant='masonry'
      cols={matches ? 2 : 1}
    >
      {children}
    </ImageList>
  )
}

export { Images }
