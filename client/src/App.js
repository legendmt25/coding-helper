import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
