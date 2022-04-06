import { Button, Box, Container } from '@mui/material';
import { createContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { getAuthentication } from './components/utility';

export const AppContext = createContext({
  useCode: '',
  setUseCode: null,
  useLanguage: '',
  setUseLanguage: null,
  userDetails: {
    email: '',
    jwttoken: '',
    avatarImage: '',
  },
  setUserDetails: null,
});

function App() {
  const [useCode, setUseCode] = useState('');
  const [useLanguage, setUseLanguage] = useState('');
  const [userDetails, setUserDetails] = useState(getAuthentication());

  return (
    <AppContext.Provider
      value={{
        useCode,
        setUseCode,
        useLanguage,
        setUseLanguage,
        userDetails,
        setUserDetails,
      }}
    >
      <Box
        className="App"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          backgroundColor: '#f8f8ff',
        }}
      >
        <Navbar />
        <Container
          maxWidth
          sx={{
            height: '100%',
            width: { xl: '80%', md: '100%' },
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
