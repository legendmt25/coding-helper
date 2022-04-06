import { Box, Button } from '@mui/material';
import { useState } from 'react';
import repository from '../repository/repository';
import InputComponent from './InputComponent';
import { buttonStyle } from './styles';

export default function CreateContest() {
  const [obj, setObj] = useState({
    name: '',
    duration: '',
    startsOn: '',
  });

  const handleCreateContest = (event) => {
    event.preventDefault();
    repository.createContest(obj).then(() => {});
  };

  return (
    <form onSubmit={handleCreateContest}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
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
      </Box>
    </form>
  );
}
