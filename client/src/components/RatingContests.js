import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import repository from '../repository/repository';
import { shadow } from './styles';

export default function RatingContestants() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    repository.getUsersWithTotalSolved().then((data) => setRatings(data));
  }, []);

  return (
    <Box sx={{ p: 1 }}>
      <TableContainer component={Paper} sx={{ boxShadow: shadow }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={2}
                sx={{ textAlign: 'center', fontWeight: 600, boxShadow: shadow }}
              >
                Ratings
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ratings.map((r) => (
              <TableRow key={r.username}>
                <TableCell>{r.username}</TableCell>
                <TableCell>{r.solved}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
