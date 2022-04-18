import { Box, Container } from '@mui/material';
import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { getAuthentication } from './components/utility';
import Footer from './components/Footer';

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
        }}
      >
        <Navbar />
        <Container
          maxWidth
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flex: '1 1 100%',
          }}
        >
          <Outlet />
        </Container>
        <Footer></Footer>
      </Box>
    </AppContext.Provider>
  );
}

export default App;
