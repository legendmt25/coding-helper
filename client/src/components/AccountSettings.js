import { Box, Button, Typography } from '@mui/material';
import InputComponent from './InputComponent';

export default function AccountSettings() {
  const obj = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleChangePassword = () => {
    if (obj.newPassword !== obj.confirmPassword) {
      return;
    }
    //fetch('') try change
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '20rem',
        mx: 'auto',
      }}
    >
      <Typography variant="h6" component={'div'}>
        Change password
      </Typography>
      <InputComponent obj={obj} attr={'oldPassword'}></InputComponent>
      <InputComponent obj={obj} attr={'newPassword'}></InputComponent>
      <InputComponent obj={obj} attr={'confirmPassword'}></InputComponent>
      <Button variant={'contained'} onClick={handleChangePassword}>
        Change password
      </Button>
    </Box>
  );
}
