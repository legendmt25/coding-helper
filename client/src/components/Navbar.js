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

  return (
    <AppBar position="static" sx={{ px: 2 }}>
      <Toolbar disableGutters>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <Typography variant="h6" component="div" sx={logo}>
            CODING HELPER
          </Typography>
        </Link>
        <Box sx={{ ml: 2, gap: 2, flexGrow: 1, display: { md: 'flex' } }}>
          {pages.map((page) => (
            <Link
              key={page}
              to={`/${page.toLowerCase()}`}
              style={{ textDecoration: 'none' }}
            >
              <Button
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
          <Tooltip title="Settings">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar
                alt="userImage"
                src="http://localhost:3000/defaultUser.png"
              />
            </IconButton>
          </Tooltip>
          <Menu
            open={Boolean(anchorUserMenu)}
            anchorEl={anchorUserMenu}
            onClose={handleCloseUserMenu}
            keepMounted
          >
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
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
