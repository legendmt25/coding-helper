import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import repository from '../repository/repository';
import InputComponent from './InputComponent';
import { buttonStyle } from './styles';

export default function CreateContest() {
  const navigate = useNavigate();
  const [obj, setObj] = useState({
    name: '',
    duration: '',
    startsOn: '',
  });

  const handleCreateContest = (event) => {
    event.preventDefault();
    repository
      .createContest({ ...obj, startsOn: new Date(obj.startsOn) })
      .then(() => navigate('/contests'));
  };

  return (
    <Box
      sx={{
        width: { xs: '100%', md: '80%', display: 'flex', flexDirection: 'column', gap: 10 },
      }}
    >
      <Typography
        component="h3"
        variant="h5"
        sx={{ borderBottom: 1, borderBottomColor: 'divider', p: 2 }}
      >
        Create contest
      </Typography>
      <form
        onSubmit={handleCreateContest}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}
      >
        <InputComponent
          obj={obj}
          setObj={setObj}
          attr={'name'}
          required
        ></InputComponent>
        <InputComponent
          obj={obj}
          setObj={setObj}
          attr={'duration'}
          required
        ></InputComponent>
        <InputComponent
          obj={obj}
          setObj={setObj}
          attr={'startsOn'}
          type={'datetime-local'}
        ></InputComponent>
        <Button type={'submit'} sx={buttonStyle}>
          Submit
        </Button>
      </form>
    </Box>
  );
}
