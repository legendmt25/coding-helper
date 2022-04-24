import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import repository from '../repository/repository';
import InputComponent from './InputComponent';
import { buttonStyle } from './styles';

export default function ContestEdit(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [obj, setObj] = useState({
    name: '',
    duration: '',
    startsOn: '',
  });

  useEffect(() => {
    repository
      .findContestById(id)
      .then(
        (data) =>
          console.log(data) ||
          setObj({
            ...data,
            startsOn: new Date(data.startsOn).toISOString().substring(0, 19),
          })
      );
  }, []);

  const handleEditContest = (event) => {
    event.preventDefault();
    console.log(obj);
    repository
      .updateContest(id, { ...obj, startsOn: new Date(obj.startsOn) })
      .then(
        (updatedSuccessfully) => updatedSuccessfully && navigate('/contests')
      );
  };

  useEffect(() => {
    console.log(obj);
  }, [obj]);

  return (
    <Box
      sx={{
        width: {
          xs: '100%',
          md: '80%',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        },
      }}
    >
      <Typography
        component="h3"
        variant="h5"
        sx={{ borderBottom: 1, borderBottomColor: 'divider', p: 2 }}
      >
        Edit contest
      </Typography>
      <form
        onSubmit={handleEditContest}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1.5rem',
        }}
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
