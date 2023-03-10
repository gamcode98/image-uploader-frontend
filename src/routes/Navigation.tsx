import { useState, useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import CloudIcon from '@mui/icons-material/Cloud'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Navigation = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
    null
  )
  const { currentUser } = useContext(UserContext)

  const navigate = useNavigate()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (): void => setAnchorElNav(null)

  const handleCloseUserMenu = (): void => setAnchorElUser(null)

  const pages = [
    {
      id: crypto.randomUUID(),
      name: 'My space',
      route: 'my-space'
    },
    {
      id: crypto.randomUUID(),
      name: 'Upload an image',
      route: 'upload-image'
    }
  ]
  const settings = ['Account', 'Logout']

  interface ActionsToSettings {
    logout: () => void
    account: () => void
  }

  const handleActionsToSettings: ActionsToSettings = {
    logout: () => {
      localStorage.removeItem('token')
      navigate('/')
    },
    account: () => navigate('/account')
  }

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <CloudIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
            <Typography
              variant='h6'
              noWrap
              component={Link}
              to='/my-space'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              tiny cloud
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                {pages.map(page => (
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Typography
                      component={Link}
                      to={`/${page.route}`}
                      sx={{
                        textDecoration: 'none',
                        color: 'black',
                        textAlign: 'center'
                      }}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <CloudIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }} />
            <Typography
              variant='h5'
              noWrap
              component={Link}
              to='/my-space'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              tiny cloud
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map(page => (
                <Button
                  key={page.id}
                  component={Link}
                  to={`/${page.route}`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={currentUser.username}
                    sx={{ backgroundColor: '#bdbdbe' }}
                    src={`https://robohash.org/${currentUser.username}`}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(setting => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign='center'
                      onClick={
                        handleActionsToSettings[
                          `${setting.toLowerCase() as keyof ActionsToSettings}`
                        ]
                      }
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  )
}
export { Navigation }
