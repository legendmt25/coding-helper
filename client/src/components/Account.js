import { Box, Divider, Tooltip } from '@mui/material';
import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AppContext } from '../App';
import repository from '../repository/repository';
import { shadow } from './styles';
import { getAuthentication } from './utility';

const optionStyle = (theme) => {
  return {
    color: 'black',
    transition: 'all',
    transitionDuration: '200ms',
    py: 2,
    ':hover': {
      color: 'white',
      backgroundColor: '#d0d3d4',
    },
  };
};

export default function Account() {
  const ctx = useContext(AppContext);

  const handleAddImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.addEventListener('change', () => {
      const formData = new FormData();
      formData.append('file', input.files[0]);
      formData.append('email', getAuthentication().email);
      repository.uploadAvatar(formData).then((res) => console.log(res));
    });
  };
  return (
    <Box sx={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          height: '8rem',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          px: 10,
          backgroundColor: 'white',
          position: 'relative',
          top: -20,
          left: -24,
          width: '100%',
          boxShadow: shadow,
        }}
      >
        <Tooltip title={'Click to change'}>
          <img
            src={`http://localhost:3000/public/${
              ctx.userDetails
                ? ctx.userDetails.avatarImage
                : 'avatars/defaultUser.png'
            }`}
            style={{
              objectFit: 'contain',
              borderRadius: 50,
              height: '60%',
              top: '50%',
              transform: 'translate(0, -50%)',
              position: 'relative',
              boxShadow: shadow,
            }}
            alt={'user avatar'}
            onClick={handleAddImage}
          />
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <Box
          sx={{
            alignSelf: 'flex-start',
            backgroundColor: 'silver',
            borderRadius: 1,
            display: 'flex',
            gap: 0,
            flexDirection: 'column',
            textAlign: 'center',
            width: '20%',
            minWidth: '180px',
            boxShadow: shadow,
          }}
        >
          <Link to={'/account/settings'} style={{ textDecoration: 'none' }}>
            <Box sx={optionStyle}>Settings</Box>
          </Link>
          <Divider></Divider>
          <Link
            to={'/account/notifications'}
            style={{ textDecoration: 'none' }}
          >
            <Box sx={optionStyle}>Notifications</Box>
          </Link>
        </Box>
        <Outlet />
      </Box>
    </Box>
  );
}
