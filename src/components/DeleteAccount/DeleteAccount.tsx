import { Alert, AlertTitle, Button, Modal, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteWithtToken } from '../../api'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4
}

const DeleteAccount = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  const handleDelete = (): void => {
    deleteWithtToken('/users')
      .then(({ data }) => {
        setLoading(true)
        console.log(data)
        navigate('/')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <Button
        variant='contained'
        size='large'
        color='error'
        sx={{ width: '100%', textTransform: 'initial' }}
        onClick={handleOpen}
      >
        Delete account
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2' mb='1rem'>
            Delete account
          </Typography>
          <Alert severity='warning' sx={{ mb: '1rem' }}>
            <AlertTitle>Warning</AlertTitle>
            This action <strong>cannot be reversed!</strong>
          </Alert>
          <Stack spacing={2} direction='row'>
            <Button
              variant='contained'
              color='error'
              sx={{ textTransform: 'initial', width: '50%' }}
              onClick={handleDelete}
            >
              {loading ? 'Removing...' : 'Confirm'}
            </Button>
            <Button
              disabled={loading}
              variant='contained'
              sx={{ textTransform: 'initial', width: '50%' }}
              onClick={handleClose}
            >Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>

  )
}

export { DeleteAccount }
