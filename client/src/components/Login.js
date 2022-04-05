import { Typography, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { buttonStyle, fieldsetStyle } from './styles';
import InputComponent from './InputComponent';
import authService from '../repository/authService';

export default function Login() {
  let navigate = useNavigate();
  const obj = {
    email: '',
    password: '',
  };

  const handleLoginButton = (event) => {
    authService
      .login(obj.email, obj.password)
      .then(() => navigate('/', { replace: true }));
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
        <Typography variant="subtitle2" component={'span'}>
          Don't have an account? <Link to={'/register'}>Register here</Link>
        </Typography>
        <Button onClick={handleLoginButton} sx={buttonStyle}>
          Login
        </Button>
      </fieldset>
    </Box>
  );
}
