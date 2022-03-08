import {
  Divider,
  Fab,
  Icon,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Add, DeleteForever } from '@mui/icons-material';
import { Box } from '@mui/material';
import ButtonCheckBox from './ButtonCheckbox';
import { difficultyColor, getAuthentication } from './utility';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Statistics from './Statistics';
import ProblemsAside from './ProblemsAside';

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
    fetch('http://localhost:3000/categories', {
      method: 'GET',
      headers: {
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
      alignItems: 'center',
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
          Authorization: `Bearer ${getAuthentication().jwttoken}`,
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

  const handleDeleteProblem = (event, problemId, index) => {
    event.preventDefault();
    fetch(`http://localhost:3000/problem/${problemId}/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getAuthentication().jwttoken}`,
        Accept: 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        problems.splice(index, 1);
        setProblems([...problems]);
      }
    });
  };

  return (
    <Box
      sx={{
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        px: { md: 10, sm: 2 },
      }}
    >
      <Typography variant="h5" component={'div'} sx={{ color: '#696969' }}>
        Categories
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
      <Divider></Divider>
      <Box
        sx={{
          display: { sm: 'block', md: 'flex' },
          flexDirection: 'row',
          gap: 5,
        }}
      >
        <Box
          sx={{
            flex: 0.7,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
          }}
        >
          <Box
            sx={(theme) => {
              return { ...rowStyle(theme), fontWeight: 600 };
            }}
          >
            <Box>#</Box>
            <Box>Title</Box>
            <Box>Difficulty</Box>
          </Box>
          {problems.map((problem, index) => (
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
                    },
                  };
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    onClick={(event) =>
                      handleDeleteProblem(event, problem.id, index)
                    }
                  >
                    <DeleteForever />
                  </IconButton>
                  {problem.id}
                </Box>
                <Box>{problem.title}</Box>
                <Box>{problem.difficulty}</Box>
              </Box>
            </Link>
          ))}
          <Link
            to={'/problem/create'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Box
              sx={(theme) => {
                return {
                  ...rowStyle(theme),
                  fontSize: 17,
                  justifyContent: 'center',
                  ':hover': {
                    backgroundColor: '#696969',
                    borderRadius: 1,
                    color: 'white',
                  },
                };
              }}
            >
              +
            </Box>
          </Link>
        </Box>
        <Box
          sx={{
            mt: { sm: 2, xs: 2 },
            flex: 0.3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Statistics></Statistics>
          <ProblemsAside></ProblemsAside>
        </Box>
      </Box>
    </Box>
  );
}
