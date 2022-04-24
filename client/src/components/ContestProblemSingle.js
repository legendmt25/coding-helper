import { Button, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import repository from '../repository/repository';
import InputComponent from './InputComponent';
import { buttonStyle } from './styles';

export default function ContestProblemSingle(props) {
  const [obj, setObj] = useState({ score: props.contestProblem.score });

  const handleSetContestProblemScore = (event) => {
    event.preventDefault();
    if (!/^[0-9]+$/.test(obj.score)) {
      alert('only digits are allowed');
      return;
    }
    repository
      .setContestProblemScore(
        props.contestId,
        props.contestProblem.problem.id,
        obj.score
      )
      .then((data) => setObj({ ...obj, score: data.score }));
  };

  return (
    <TableRow>
      <TableCell
        sx={{
          ':hover': {
            color: 'blue',
          },
        }}
      >
        <Link
          style={{ color: 'inherit', textDecoration: 'none' }}
          to={`/contest/${props.contestId}/problem/${props.contestProblem.problem.id}`}
        >
          {props.contestProblem.problem.title}
        </Link>
      </TableCell>
      <TableCell>
        <form onSubmit={handleSetContestProblemScore}>
          <InputComponent
            obj={obj}
            setObj={setObj}
            attr={'score'}
            width={'100%'}
            label={'Set score'}
          ></InputComponent>
        </form>
        {/* {obj.score} */}
      </TableCell>
      <TableCell sx={{ textAlign: 'right' }}>
        <Button
          onClick={(event) =>
            props.handleRemoveProblem(props.contestProblem.problem.id)
          }
          sx={buttonStyle}
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}
