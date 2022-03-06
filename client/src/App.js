import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <Box className="App" sx={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Container
        maxWidth
        sx={{ backgroundColor: '#f8f8ff', height: '100%', mt: 1 }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}

export default App;
