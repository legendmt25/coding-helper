import { Typography, Box, Button } from '@mui/material';
import { buttonStyle, fieldsetStyle } from '../styles';
import InputComponent from './InputComponent';

export default function Login() {
  const obj = {
    email: '',
    password: '',
  };

  const handleLoginButton = (event) => {
    console.log(obj.email, obj.password);
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
