import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import ButtonCheckBox from './ButtonCheckbox';
import { difficultyColor } from './utility';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Problems() {
  const [problems, setProblems] = useState([
    { id: 1, title: 'Two Sum', difficulty: 'EASY' },
  ]);
  const filters = new Set();

  const rowStyle = (theme) => {
    return {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      px: 5,
      py: 2,
      ':hover': { backgroundColor: 'gray', borderRadius: 1, color: 'white' },
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.7rem',
      },
      fontSize: '0.8rem',
    };
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="h5" component={'div'} sx={{ color: '#696969' }}>
        Categories
      </Typography>
      <Box sx={{ display: 'inline-flex', gap: 1, mt: 1 }}>
        <ButtonCheckBox
          filters={filters}
          category={'category'}
        ></ButtonCheckBox>
        <ButtonCheckBox
          filters={filters}
          category={'category2'}
        ></ButtonCheckBox>
        <ButtonCheckBox
          filters={filters}
          category={'category3'}
        ></ButtonCheckBox>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 2 }}>
        <Box
          sx={(theme) => {
            return { ...rowStyle(theme), fontWeight: 600 };
          }}
        >
          <Box>#</Box>
          <Box>Title</Box>
          <Box>Difficulty</Box>
        </Box>
        {problems.map((el) => (
          <Link
            to={`/problem/${el.id}`}
            style={{
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Box
              sx={(theme) => {
                return {
                  ...rowStyle(theme),
                  color: difficultyColor(el.difficulty),
                  ':hover': {
                    backgroundColor: difficultyColor(el.difficulty),
                    color: 'white',
                    borderRadius: 1,
                  },
                };
              }}
            >
              <Box>{el.id}</Box>
              <Box>{el.title}</Box>
              <Box>{el.difficulty}</Box>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
