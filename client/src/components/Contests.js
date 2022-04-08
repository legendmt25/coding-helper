import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import repository from '../repository/repository';
import RatingContestants from './RatingContests';
import { shadow } from './styles';

export default function Contests() {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    repository.findAllContests().then((data) => {
      setContests(data);
    });
  }, []);

  return (
    <Box sx={{ display: { md: 'flex', sm: 'block' }, gap: 2 }}>
      <Box
        sx={{
          flex: 0.2,
          m: 2,
          borderRadius: 1,
          boxShadow: shadow,
        }}
      >
        <RatingContestants></RatingContestants>
      </Box>
      <Box sx={{ flex: 0.8, p: 2 }}>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 1, boxShadow: shadow }}
        >
          <Table>
            <TableHead sx={{ boxShadow: shadow }}>
              <TableRow>
                <TableCell>Contest</TableCell>
                <TableCell>Starts on</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contests.map((contest, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      ':hover': {
                        color: 'blue',
                      },
                    }}
                  >
                    <Link
                      style={{ color: 'inherit', textDecoration: 'none' }}
                      to={'/contest/' + contest.id}
                    >
                      {contest.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {`${new Date(
                      contest.startsOn
                    ).toLocaleDateString()}, ${new Date(
                      contest.startsOn
                    ).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}`}
                  </TableCell>
                  <TableCell>{contest.duration}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} sx={{ p: 0 }}>
                  <Button
                    fullWidth
                    sx={{
                      color: 'black',
                      p: 0,
                      ':hover': { backgroundColor: '#fffff3' },
                    }}
                  >
                    <Link
                      to={'/contest/create'}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        width: 'inherit',
                        padding: '1rem 2rem',
                      }}
                    >
                      Create new
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }} colSpan={3}>
                  Pagination
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
