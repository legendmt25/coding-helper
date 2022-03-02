import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import ButtonCheckBox from './ButtonCheckbox';
import { difficultyColor } from './utility';
import { Link } from 'react-router-dom';

export default function Problems() {
  const filters = new Set();

  const rowStyle = (theme) => {
    return {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      px: 5,
      py: 2,
      ':hover': { backgroundColor: 'gray', borderRadius: 1, color: 'white' },
    };
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="h5" component={'div'} sx={{ color: 'teal' }}>
        Categories
      </Typography>
      <Box sx={{ display: 'inline-flex', gap: 2, mt: 1 }}>
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
        <Link
          to="/problems"
          style={{
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <Box
            sx={(theme) => {
              return {
                ...rowStyle(theme),
                color: difficultyColor('EASY'),
                ':hover': {
                  backgroundColor: difficultyColor('EASY'),
                  color: 'white',
                  borderRadius: 1,
                },
              };
            }}
          >
            <Box>1</Box>
            <Box>Two Sum</Box>
            <Box>EASY</Box>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
