import { LoginOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAuthentication } from './utility';
import { shadow } from './styles';
import { useContext } from 'react';
import { AppContext } from '../App';

export default function Statistics() {
  const ctx = useContext(AppContext);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        boxShadow: shadow,
        gap: 1,
        pb: 2,
      }}
    >
      <Typography
        variant={'h6'}
        sx={{
          backgroundColor: 'white',
          py: 1,
          borderRadius: 1,
        }}
      >
        Statistics
      </Typography>
      {(ctx.userDetails == null && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link to={'/login'} style={{ display: 'flex' }}>
            You need to login first<LoginOutlined></LoginOutlined>
          </Link>
        </Box>
      )) || (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box>Total solved</Box>
            <Box>52</Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'green',
              }}
            >
              <Box>Easy</Box>
              <Box>52</Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'orange',
              }}
            >
              <Box>Medium</Box>
              <Box>52</Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'red',
              }}
            >
              <Box>Hard</Box>
              <Box>5432</Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
