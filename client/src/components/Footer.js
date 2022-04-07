import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { shadowTop } from './styles';

export default function Footer() {
  return (
    <Box
      component={'footer'}
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        transition: 'all',
        transitionDuration: '250ms',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#f2f3f0',
        ':hover': {
          backgroundColor: '#f2f3f5',
        },
        boxShadow: shadowTop,
      }}
    >
      <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
        <Button>@CodingH</Button>
      </Link>
      <Box>
        <Link
          to={'/problems'}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <Button>Problems</Button>
        </Link>
        <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Button>Contests</Button>
        </Link>
      </Box>
    </Box>
  );
}
