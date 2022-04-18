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
import { Link, useNavigate, useParams } from 'react-router-dom';
import repository from '../repository/repository';
import ContestProblemSingle from './ContestProblemSingle';
import { buttonStyle, shadow } from './styles';

export default function ContestDetails(props) {
  const navigate = useNavigate();
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

  const handleStartContest = (event) =>
    repository.startContest(id).then((data) => {
      if (!data) {
        return;
      }
      setContest({ ...contest, status: 'STARTED' });
    });

  const handleCloseContest = (event) =>
    repository.closeContest(id).then((data) => {
      if (!data) {
        return;
      }
      setContest({ ...contest, status: 'CLOSED' });
    });

  const handleContestDelete = (event) => {
    repository.deleteContest(id).then((data) => data && navigate('/contests'));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: { xs: '100%', md: '80%' },
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
        <Typography variant="subtitle2">Status: {contest.status}</Typography>
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 1, boxShadow: shadow }}
      >
        <Table>
          {/* <TableHead>
            <TableRow>
              <TableCell>Problems</TableCell>
              <TableCell>Scores</TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {contest.problems.map((problem, index) => (
              <ContestProblemSingle
                key={index}
                contestProblem={problem}
                contestId={id}
              ></ContestProblemSingle>
            ))}
            {contest.status === 'OPEN' && (
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
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {contest.status === 'OPEN' && (
        <Button sx={buttonStyle} onClick={handleStartContest}>
          Begin contest
        </Button>
      )}
      {contest.status === 'STARTED' && (
        <Button sx={buttonStyle} onClick={handleCloseContest}>
          Close contest
        </Button>
      )}
      <Button sx={buttonStyle} onClick={handleContestDelete}>
        Delete
      </Button>
    </Box>
  );
}
