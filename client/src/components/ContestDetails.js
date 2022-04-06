import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import repository from '../repository/repository';
import { shadow } from './styles';

export default function ContestDetails(props) {
  const { id } = useParams();
  const [contest, setContest] = useState({
    id: 1,
    name: '',
    duration: '',
    problems: [],
  });

  useEffect(() => {
    repository.findContestById(id).then((data) => setContest(data));
  }, [id]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}
      >
        {contest.name}
        <Typography variant="subtitle2">
          Duration: {contest.duration}
        </Typography>
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 1, boxShadow: shadow }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Problem</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contest.problems.map((problem) => (
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
                    to={'/contest/' + problem.id}
                  >
                    {problem.title}
                  </Link>
                </TableCell>
                <TableCell>{problem.score}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} sx={{ p: 0 }}>
                <Button
                  fullWidth
                  sx={{
                    color: 'black',
                    p: 0,
                    ':hover': { backgroundColor: '#fffff3' },
                  }}
                >
                  <Link
                    to={`/contest/${id}/add-problem`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      width: 'inherit',
                      padding: '1rem 2rem',
                    }}
                  >
                    Add new problem to the contest
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
