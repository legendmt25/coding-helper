import { Divider, Fab, Input, TextField, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Box } from '@mui/material';
import ButtonCheckBox from './ButtonCheckbox';
import { difficultyColor } from './utility';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function Problems() {
  const addCategoryInputRef = useRef(null);
  const [problems, setProblems] = useState([]);
  const [filters, setFilters] = useState([]);
  const [categories, setCategories] = useState([]);

  let newCategory = '';

  useEffect(() => {
    fetch('http://localhost:3000/problems', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        categories: [...filters],
      }),
    })
      .then((res) => res.json())
      .then((res) => setProblems(res));
  }, [filters]);

  useEffect(() => {
    console.log(localStorage.getItem('jwt'));
    fetch('http://localhost:3000/categories', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => setCategories(res));
  }, []);

  const rowStyle = (theme) => {
    return {
      transition: 'all',
      transitionDuration: '200ms',
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

  const handleAddCategoryButton = () => {
    if (
      !addCategoryInputRef.current.style.width ||
      addCategoryInputRef.current.style.width === '0px'
    ) {
      addCategoryInputRef.current.style.width = '150px';
      addCategoryInputRef.current.focus();
    } else {
      addCategory();
    }
  };

  const addCategory = () => {
    if (
      newCategory !== '' &&
      !categories.map((category) => category.nameT).includes(newCategory)
    ) {
      fetch('http://localhost:3000/category/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: newCategory,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setCategories([...categories, res]);
          addCategoryInputRef.current.style.width = 0;
        });
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="h5" component={'div'} sx={{ color: '#696969' }}>
        Categories
      </Typography>
      <Box sx={{ display: 'inline-flex', gap: 1, mt: 1 }}>
        {categories.map((category) => (
          <ButtonCheckBox
            key={category.name}
            filters={filters}
            setFilters={setFilters}
            category={category.name}
          ></ButtonCheckBox>
        ))}
        <TextField
          ref={addCategoryInputRef}
          onChange={(event) => (newCategory = event.target.value)}
          onKeyUp={(event) => event.code === 'Enter' && addCategory()}
          sx={{
            width: 0,
            transition: 'all',
            transitionDuration: '200ms',
          }}
          variant={'standard'}
        ></TextField>
        <Fab size={'small'}>
          <Add onClick={handleAddCategoryButton} />
        </Fab>
      </Box>
      <Divider sx={{ mt: 1 }}></Divider>
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
        {problems.map((problem) => (
          <Link
            key={problem.id}
            to={`/problem/${problem.id}`}
            style={{
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Box
              sx={(theme) => {
                return {
                  ...rowStyle(theme),
                  color: difficultyColor(problem.difficulty),
                  ':hover': {
                    backgroundColor: difficultyColor(problem.difficulty),
                    color: 'white',
                    borderRadius: 1,
                  },
                };
              }}
            >
              <Box>{problem.id}</Box>
              <Box>{problem.title}</Box>
              <Box>{problem.difficulty}</Box>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
