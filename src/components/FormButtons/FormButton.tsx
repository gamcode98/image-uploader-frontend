import { Button } from '@mui/material'

interface Props {
  loading: boolean
  action: string
}

const FormButton = ({ loading, action }: Props): JSX.Element => {
  return (

    <Button
      variant='contained'
      size='large'
      type='submit'
      disabled={loading}
      sx={{ textTransform: 'initial', width: '100%', mb: '1rem', fontSize: '1rem' }}
    >
      {!loading ? action : 'Sending...'}
    </Button>

  )
}

export { FormButton }
