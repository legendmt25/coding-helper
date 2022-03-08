import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { shadow } from './styles';

export default function ProblemsAside() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/problems/top10', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => setProblems(res));
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        boxShadow: shadow,
        borderRadius: 1,
      }}
    >
      <Typography
        variant={'h6'}
        component={'p'}
        sx={{ backgroundColor: 'white', py: 1, borderRadius: 1 }}
      >
        Top liked problems
      </Typography>
      {problems.map((problem, index) => (
        <Link
          to={`/problem/${problem.id}`}
          style={{
            color: 'black',
            textDecoration: 'none',
          }}
        >
          <Box
            key={problem.id}
            sx={{
              p: 2,
              transition: 'all',
              transitionDuration: '200ms',
              display: 'flex',
              justifyContent: 'space-evenly',
              ':hover': {
                color: 'blue',
                backgroundColor: 'whitesmoke',
              },
            }}
          >
            <Box>{index + 1}</Box>
            <Box>{problem.title}</Box>
            <Box>{problem.likes}</Box>
          </Box>
        </Link>
      ))}
    </Box>
  );
}
