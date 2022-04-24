import { Divider, Fab, IconButton, TextField, Typography } from '@mui/material';
import {
  Add as AddIcon,
  DeleteForever as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import ButtonCheckBox from './ButtonCheckbox';
import { difficultyColor } from './utility';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Statistics from './Statistics';
import ProblemsAside from './ProblemsAside';
import repository from '../repository/repository';

export default function Problems() {
  const addCategoryInputRef = useRef(null);
  const [problems, setProblems] = useState([]);
  const [filters, setFilters] = useState([]);
  const [categories, setCategories] = useState([]);

  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    repository.findAllProblems(filters).then((res) => setProblems(res));
  }, [filters]);

  useEffect(() => {
    repository.findAllCategories().then((res) => setCategories(res));
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
      !categories.map((category) => category.name).includes(newCategory)
    ) {
      repository.createCategory(newCategory).then((res) => {
        setCategories([...categories, res]);
        addCategoryInputRef.current.style.width = 0;
        setNewCategory('');
      });
    }
  };

  const handleDeleteProblem = (event, problemId, index) => {
    event.preventDefault();
    repository.deleteProblem(problemId).then((data) => {
      if (data) {
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
        width: { xs: '100%', md: '80%' },
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
          onChange={(event) => setNewCategory(event.target.value)}
          value={newCategory}
          onKeyUp={(event) => event.code === 'Enter' && addCategory()}
          sx={{
            width: 0,
            transition: 'all',
            transitionDuration: '200ms',
          }}
          variant={'standard'}
        ></TextField>
        <Fab size={'small'} onClick={handleAddCategoryButton}>
          <AddIcon />
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
            justifyContent: 'center',
            gap: 0.5,
            textAlign: 'center',
          }}
        >
          <Box
            sx={(theme) => {
              return { ...rowStyle(theme), fontWeight: 600 };
            }}
          >
            <Box sx={{ flex: '1 1 10%' }}>#</Box>
            <Box sx={{ flex: '1 1 80%' }}>Title</Box>
            <Box sx={{ flex: '1 1 10%' }}>Difficulty</Box>
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
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: '1 1 10%',
                  }}
                >
                  <IconButton sx={{ p: 0 }}>
                    <DeleteIcon
                      sx={{ p: 1 }}
                      onClick={(event) =>
                        handleDeleteProblem(event, problem.id, index)
                      }
                    ></DeleteIcon>
                  </IconButton>
                  <IconButton sx={{ p: 0 }}>
                    <Link to={`/problem/${problem.id}/edit`}>
                      <EditIcon sx={{ p: 1 }}></EditIcon>
                    </Link>
                  </IconButton>
                  {problem.id}
                </Box>
                <Box sx={{ flex: '1 1 80%' }}>{problem.title}</Box>
                <Box sx={{ flex: '1 1 10%' }}>{problem.difficulty}</Box>
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
            px: 10,
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
