import { Box, Container } from '@mui/material';
import { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export const AppContext = createContext({});

function App() {
  return (
    <AppContext.Provider value={{ useCode: '', useLanguage: '' }}>
      <Box
        className="App"
        sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
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
      </Box>
    </AppContext.Provider>
  );
}

export default App;
