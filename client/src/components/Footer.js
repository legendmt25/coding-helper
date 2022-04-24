import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { shadowTop } from './styles';

export default function Footer() {
  const links = ['Problems', 'Contests'];

  return (
    <Box
      component={'footer'}
      sx={{
        mt: 2,
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
        {links.map((link) => (
          <Link
            to={`/${link}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Button>{link}</Button>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
