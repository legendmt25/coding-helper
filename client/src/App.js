import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container maxWidth sx={{backgroundColor: '#f8f8ff', height: '100%'}}>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
