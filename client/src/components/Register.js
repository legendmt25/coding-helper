import { Typography, Box, Button } from '@mui/material';
import { buttonStyle, fieldsetStyle } from '../styles';
import InputComponent from './InputComponent';
import SelectComponent from './SelectComponent';
import { transformToSelectItems } from './utility';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let navigate = useNavigate();
  const d = new Date();
  const obj = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    gender: 0,
    birthday: `${d.getFullYear()}-${d.getMonth() + 1 < 9 ? '0' : ''}${
      d.getMonth() + 1
    }-${d.getDay() - 1 < 9 ? '0' : ''}${d.getDay() - 1}`,
  };

  const gender = ['MALE', 'FEMALE', 'OTHER'];

  const handleRegisterButton = (event) => {
    if (obj.confirmPassword !== obj.password) {
      return;
    }
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...obj }),
    }).then((res) => navigate('/login', { replace: true }));
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
          Register
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
          <InputComponent
            required
            obj={obj}
            attr={'firstName'}
          ></InputComponent>
          <InputComponent required obj={obj} attr={'lastName'}></InputComponent>
        </Box>
        <InputComponent required obj={obj} attr={'username'}></InputComponent>
        <InputComponent required obj={obj} attr={'email'}></InputComponent>
        <InputComponent required obj={obj} attr={'password'}></InputComponent>
        <InputComponent
          obj={obj}
          attr={'confirmPassword'}
          type={'password'}
        ></InputComponent>
        <InputComponent
          obj={obj}
          attr={'birthday'}
          type={'date'}
        ></InputComponent>
        <SelectComponent
          selectItems={transformToSelectItems(gender)}
          obj={obj}
          attr={'gender'}
        ></SelectComponent>
        <Button onClick={handleRegisterButton} sx={buttonStyle}>
          Register
        </Button>
      </fieldset>
    </Box>
  );
}
