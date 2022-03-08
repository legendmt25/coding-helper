import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Menu,
  Tooltip,
  IconButton,
  Avatar,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuthentication } from './utility';

const pages = ['Problems'];

const logo = (theme) => {
  return {
    typography: 'body2',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    ':hover': { color: '#ccd0d0' },
    userSelect: 'none',
    [theme.breakpoints.up('sm')]: { fontSize: '1.3rem' },
    color: 'white',
    cursor: 'default',
  };
};

export default function Navbar() {
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorUserMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <AppBar position="static" sx={{ px: 2 }}>
      <Toolbar disableGutters sx={{ gap: 2 }}>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <Typography variant="h6" component="div" sx={logo}>
            CODING HELPER
          </Typography>
        </Link>
        <Box sx={{ gap: 2, flexGrow: 1, display: 'flex' }}>
          {pages.map((page) => (
            <Link
              key={page}
              to={`/${page.toLowerCase()}`}
              style={{ textDecoration: 'none' }}
            >
              <Button
                size={'small'}
                sx={{
                  color: 'white',
                  display: 'block',
                  ':hover': { color: 'black' },
                }}
              >
                {page}
              </Button>
            </Link>
          ))}
        </Box>
        <Box>
          {getAuthentication() != null && `${getAuthentication().email}`}
          <Tooltip title="Settings">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar
                alt="userImage"
                src={`http://localhost:3000/public/${
                  getAuthentication() != null
                    ? getAuthentication().avatarImage
                    : 'defaultUser.png'
                }`}
              />
            </IconButton>
          </Tooltip>
          <Menu
            open={Boolean(anchorUserMenu)}
            anchorEl={anchorUserMenu}
            onClose={handleCloseUserMenu}
            keepMounted
          >
            {getAuthentication() == null && (
              <MenuItem sx={{ p: 0 }}>
                <Button onClick={handleCloseUserMenu} fullWidth>
                  <Link
                    to={'/login'}
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                      display: 'block',
                      width: '100%',
                      padding: '5px 20px',
                    }}
                  >
                    Login
                  </Link>
                </Button>
              </MenuItem>
            )}
            {getAuthentication() == null && (
              <MenuItem sx={{ p: 0 }}>
                <Button onClick={handleCloseUserMenu} fullWidth>
                  <Link
                    to={'/register'}
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                      display: 'block',
                      width: '100%',
                      padding: '5px 20px',
                    }}
                  >
                    Register
                  </Link>
                </Button>
              </MenuItem>
            )}
            {getAuthentication() != null && (
              <MenuItem sx={{ p: 0 }}>
                <Button onClick={handleCloseUserMenu} fullWidth>
                  <Link
                    to={'/mysubmissions'}
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                      display: 'block',
                      width: '100%',
                      padding: '5px 20px',
                    }}
                  >
                    My submissions
                  </Link>
                </Button>
              </MenuItem>
            )}
            {getAuthentication() != null && (
              <MenuItem sx={{ p: 0 }}>
                <Button onClick={handleCloseUserMenu} fullWidth>
                  <Link
                    to={'/account'}
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                      display: 'block',
                      width: '100%',
                      padding: '5px 20px',
                    }}
                  >
                    Account
                  </Link>
                </Button>
              </MenuItem>
            )}
            {getAuthentication() != null && (
              <MenuItem sx={{ p: 0 }}>
                <Button
                  size={'small'}
                  sx={{
                    textDecoration: 'none',
                    color: 'black',
                    display: 'block',
                    width: '100%',
                    padding: '5px 40px',
                  }}
                  onClick={(event) => {
                    handleCloseUserMenu();
                    handleLogout();
                  }}
                  fullWidth
                >
                  Logout
                </Button>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
