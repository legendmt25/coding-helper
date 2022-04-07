import { Typography, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { buttonStyle, fieldsetStyle } from './styles';
import InputComponent from './InputComponent';
import authService from '../repository/authService';
import { useContext, useState } from 'react';
import { AppContext } from '../App';
import { getAuthentication } from './utility';

export default function Login() {
  const ctx = useContext(AppContext);
  let navigate = useNavigate();
  const [error, setError] = useState('');
  const [obj, setObj] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (event) => {
    event.preventDefault();
    authService
      .login(obj.email, obj.password)
      .then(() => {
        ctx.setUserDetails(getAuthentication());
        if (window.history.state && window.history.state.idx > 0) navigate(-1);
        else navigate('/', { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <Box sx={{ p: { xs: 0, sm: 0, md: 0 } }}>
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
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
          <InputComponent
            obj={obj}
            setObj={setObj}
            attr={'email'}
            required
          ></InputComponent>
          <InputComponent
            obj={obj}
            setObj={setObj}
            attr={'password'}
            required
          ></InputComponent>
          <Typography variant="subtitle2" component={'span'}>
            Don't have an account? <Link to={'/register'}>Register here</Link>
          </Typography>
          <Button sx={buttonStyle} type={'submit'}>
            Login
          </Button>
          <Typography sx={{ color: 'red' }} component={'div'}>
            {error}
          </Typography>
        </fieldset>
      </form>
    </Box>
  );
}
