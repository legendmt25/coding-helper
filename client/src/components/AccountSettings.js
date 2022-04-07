import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import InputComponent from './InputComponent';

export default function AccountSettings() {
  const [obj, setObj] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

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
        width: { sm: '100%', md: '70%', lg: '50%' },
        mx: 'auto',
      }}
    >
      <Typography variant="h6" component={'div'}>
        Change password
      </Typography>
      <InputComponent
        obj={obj}
        setObj={setObj}
        attr={'oldPassword'}
      ></InputComponent>
      <InputComponent
        obj={obj}
        setObj={setObj}
        attr={'newPassword'}
      ></InputComponent>
      <InputComponent
        obj={obj}
        setObj={setObj}
        attr={'confirmPassword'}
      ></InputComponent>
      <Button variant={'contained'} onClick={handleChangePassword}>
        Change password
      </Button>
    </Box>
  );
}
