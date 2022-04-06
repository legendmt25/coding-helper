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
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { domain } from '../repository/repository';

const pages = ['Problems', 'Contests'];

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

const settingsLinkStyle = {
  textDecoration: 'none',
  color: 'black',
  display: 'block',
  width: '100%',
  padding: '5px 20px',
};

export default function Navbar() {
  const ctx = useContext(AppContext);
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorUserMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    ctx.setUserDetails(null);
  };

  return (
    <AppBar position="static" sx={{ px: 2 }}>
      <Toolbar disableGutters sx={{ gap: 2 }}>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <Typography variant="h6" component="div" sx={logo}>
            CodingH
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
          {ctx.userDetails != null && ctx.userDetails.email}
          <Tooltip title="Settings">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar
                alt="userImage"
                src={`${domain}/public/${
                  ctx.userDetails
                    ? ctx.userDetails.avatarImage
                    : 'avatars/defaultUser.png'
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
            {ctx.userDetails == null && (
              <MenuItem sx={{ p: 0 }}>
                <Button onClick={handleCloseUserMenu} fullWidth>
                  <Link to={'/login'} style={settingsLinkStyle}>
                    Login
                  </Link>
                </Button>
              </MenuItem>
            )}
            {ctx.userDetails == null && (
              <MenuItem sx={{ p: 0 }}>
                <Button onClick={handleCloseUserMenu} fullWidth>
                  <Link to={'/register'} style={settingsLinkStyle}>
                    Register
                  </Link>
                </Button>
              </MenuItem>
            )}
            {ctx.userDetails != null && (
              <MenuItem sx={{ p: 0 }}>
                <Button onClick={handleCloseUserMenu} fullWidth>
                  <Link to={'/mysubmissions'} style={settingsLinkStyle}>
                    My submissions
                  </Link>
                </Button>
              </MenuItem>
            )}
            {ctx.userDetails && (
              <MenuItem sx={{ p: 0 }}>
                <Button onClick={handleCloseUserMenu} fullWidth>
                  <Link to={'/account'} style={settingsLinkStyle}>
                    Account
                  </Link>
                </Button>
              </MenuItem>
            )}
            {ctx.userDetails && (
              <MenuItem sx={{ p: 0 }}>
                <Button
                  size={'small'}
                  sx={settingsLinkStyle}
                  fullWidth
                  onClick={(event) => {
                    handleCloseUserMenu();
                    handleLogout();
                  }}
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
