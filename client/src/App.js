import { Button, Box, Container } from '@mui/material';
import { createContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export const AppContext = createContext({});

function App() {
  return (
    <AppContext.Provider value={{ useCode: '', useLanguage: '' }}>
      <Box
        className="App"
        sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
      >
        <Navbar />
        <Container
          maxWidth
          sx={{
            backgroundColor: '#f8f8ff',
            height: '100%',
            overflowX: 'hidden',
          }}
        >
          <Outlet />
        </Container>
        <footer>
          <Box
            sx={{
              transition: 'all',
              transitionDuration: '250ms',
              p: 1,
              display: 'flex',
              justifyContent: 'space-between',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              ':hover': {
                backgroundColor: '#f2f3f5',
              },
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
              <Link
                to={'/'}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Button>Contests</Button>
              </Link>
            </Box>
          </Box>
        </footer>
      </Box>
    </AppContext.Provider>
  );
}

export default App;
