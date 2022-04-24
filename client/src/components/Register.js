import { Typography, Box, Button } from '@mui/material';
import { buttonStyle, fieldsetStyle } from './styles';
import InputComponent from './InputComponent';
import SelectComponent from './SelectComponent';
import { getAuthentication, transformToSelectItems } from './utility';
import { useNavigate } from 'react-router-dom';
import authService from '../repository/authService';
import { useEffect, useState } from 'react';

export default function Register() {
  let navigate = useNavigate();
  const gender = ['MALE', 'FEMALE', 'OTHER'];

  const d = new Date();
  const [obj, setObj] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: `${d.getFullYear()}-${d.getMonth() + 1 < 9 ? '0' : ''}${
      d.getMonth() + 1
    }-${d.getDay() - 1 < 9 ? '0' : ''}${d.getDay() - 1}`,
    gender: 0,
  });
  const [error, setError] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();
    if (obj.confirmPassword !== obj.password) {
      setError('Passwords are not same');
      return;
    }
    authService
      .register(obj)
      .then((res) => navigate('/login', { replace: true }));
  };

  useEffect(() => {
    if (!getAuthentication()) return;
    if (window.history.state && window.history.state.idx > 0) navigate(-1);
    else navigate('/', { replace: true });
  }, []);

  return (
    <Box sx={{ p: 0, alignSelf: 'center' }}>
      <form onSubmit={handleRegister}>
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
            Register
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
            <InputComponent
              obj={obj}
              setObj={setObj}
              attr={'firstName'}
              required
            ></InputComponent>
            <InputComponent
              obj={obj}
              setObj={setObj}
              attr={'lastName'}
              required
            ></InputComponent>
          </Box>
          <InputComponent
            obj={obj}
            setObj={setObj}
            attr={'username'}
            required
          ></InputComponent>
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
          <InputComponent
            obj={obj}
            setObj={setObj}
            attr={'confirmPassword'}
            type={'password'}
          ></InputComponent>
          <InputComponent
            obj={obj}
            setObj={setObj}
            attr={'birthday'}
            type={'date'}
          ></InputComponent>
          <SelectComponent
            selectItems={transformToSelectItems(gender)}
            obj={obj}
            setObj={setObj}
            attr={'gender'}
          ></SelectComponent>
          <Typography variant={'body1'} element={'span'} sx={{ color: 'red' }}>
            {error}
          </Typography>
          <Button sx={buttonStyle} type={'submit'}>
            Register
          </Button>
        </fieldset>
      </form>
    </Box>
  );
}
