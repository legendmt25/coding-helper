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
import { useContext, useEffect, useState } from 'react';
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
  const [anchorMenu, setAnchorMenu] = useState(null);

  const handleOpenUserMenu = (event) => setAnchorUserMenu(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorUserMenu(null);
  const handleOpenMenu = (event) => setAnchorMenu(event.currentTarget);
  const handleCloseMenu = () => setAnchorMenu(null);

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
        <Box
          sx={{
            gap: 2,
            flexGrow: 1,
            display: { sm: 'none', xs: 'none', md: 'flex' },
          }}
        >
          {pages.map((page, index) => (
            <Link
              key={index}
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
        <Box
          sx={{
            gap: 2,
            flexGrow: 1,
            display: { sm: 'flex', md: 'none' },
            position: 'relative',
          }}
        >
          <Button fullWidth sx={{ color: 'white' }} onClick={handleOpenMenu}>
            Menu
          </Button>
          <Menu
            open={Boolean(anchorMenu)}
            anchorEl={anchorMenu}
            onClose={handleCloseMenu}
            keepMounted
            PaperProps={{
              style: {
                width:
                  anchorMenu?.offsetWidth < 300
                    ? '100%'
                    : anchorMenu?.offsetWidth + 'px',
              },
            }}
          >
            {pages.map((page, index) => (
              <MenuItem key={index} sx={{ p: 0 }}>
                <Button onClick={handleCloseMenu} fullWidth>
                  <Link to={`/${page.toLowerCase()}`} style={settingsLinkStyle}>
                    {page}
                  </Link>
                </Button>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              wordBreak: 'break-all',
              display: { xs: 'none', sm: 'none', md: 'block' },
            }}
          >
            {ctx.userDetails != null && ctx.userDetails.email}
          </Typography>
          <Tooltip title="Settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                my: 1,
                backgroundColor: 'white',
                ':hover': { backgroundColor: 'white' },
              }}
            >
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
            {ctx.userDetails && (
              <MenuItem
                sx={{
                  borderBottom: 1,
                  borderBottomColor: 'divider',
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    wordBreak: 'break-all',
                  }}
                >
                  <Typography variant="subtitle2">Logged in as: </Typography>
                  {ctx.userDetails.email}
                </Typography>
              </MenuItem>
            )}
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
