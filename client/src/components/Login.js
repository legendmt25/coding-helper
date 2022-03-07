import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { buttonStyle, fieldsetStyle } from './styles';
import InputComponent from './InputComponent';

export default function Login() {
  let navigate = useNavigate();
  const obj = {
    email: '',
    password: '',
  };

  const handleLoginButton = (event) => {
    fetch('http://localhost:3000/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ ...obj }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.jwttoken) {
          localStorage.setItem('authentication', JSON.stringify(res));
          navigate('/', { replace: true });
        }
      });
  };

  return (
    <Box sx={{ p: 5 }}>
      <fieldset style={fieldsetStyle}>
        <Typography
          variant="subtitle1"
          component="legend"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 100,
            userSelect: 'none',
            color: '#2F4F4F',
          }}
        >
          Login
        </Typography>
        <InputComponent obj={obj} attr={'email'}></InputComponent>
        <InputComponent obj={obj} attr={'password'}></InputComponent>
        <Button onClick={handleLoginButton} sx={buttonStyle}>
          Login
        </Button>
      </fieldset>
    </Box>
  );
}
