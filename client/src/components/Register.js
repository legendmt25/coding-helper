import { Typography, Box, Button } from '@mui/material';
import { buttonStyle, fieldsetStyle } from '../styles';
import InputComponent from './InputComponent';
import SelectComponent from './SelectComponent';
import { transformToSelectItems } from './utility';

export default function Register() {
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
          <InputComponent obj={obj} attr={'firstName'}></InputComponent>
          <InputComponent obj={obj} attr={'lastName'}></InputComponent>
        </Box>
        <InputComponent obj={obj} attr={'username'}></InputComponent>
        <InputComponent obj={obj} attr={'email'}></InputComponent>
        <InputComponent obj={obj} attr={'password'}></InputComponent>
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
