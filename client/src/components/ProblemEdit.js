import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import MarkdownIt from 'react-markdown-it';
import SelectComponent from './SelectComponent';
import InputComponent from './InputComponent';
import { transformToSelectItems } from './utility';
import { useNavigate, useParams } from 'react-router-dom';
import repository from '../repository/repository';

export default function ProblemEdit(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const difficulties = ['EASY', 'MEDIUM', 'HARD'];
  const [categories, setCategories] = useState([]);
  const [obj, setObj] = useState({
    difficulty: '0',
    category: '0',
    title: '',
    markdown: '',
  });

  useEffect(() => {
    repository
      .findAllCategories()
      .then((res) => setCategories(res.map((category) => category.name)));
  }, []);

  useEffect(() => {
    repository.findProblemById(id).then((data) => {
      setObj({
        difficulty: difficulties.indexOf(data.problem.difficulty),
        category: categories.indexOf(data.problem.category.name),
        title: data.problem.title,
        markdown: data.problem.markdown,
      });
    });
  }, [categories]);

  const handleEditProblem = (event) => {
    event.preventDefault();
    repository
      .updateProblem(id, {
        ...obj,
        difficulty: difficulties[obj.difficulty],
        category: categories[obj.category],
      })
      .then((data) => navigate(-1));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        pt: 1,
        flexDirection: { sm: 'column', xs: 'column', md: 'row' },
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: { md: '50%', sm: '100%', xs: '100%' },
        }}
      >
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          onSubmit={handleEditProblem}
        >
          <InputComponent
            obj={obj}
            setObj={setObj}
            attr={'title'}
            required
          ></InputComponent>
          <InputComponent
            obj={obj}
            setObj={setObj}
            attr={'markdown'}
            multiline
            required
          ></InputComponent>
          <SelectComponent
            obj={obj}
            setObj={setObj}
            attr={'difficulty'}
            selectItems={transformToSelectItems(difficulties)}
            required
          ></SelectComponent>
          <SelectComponent
            obj={obj}
            setObj={setObj}
            attr={'category'}
            selectItems={transformToSelectItems(categories)}
            required
          ></SelectComponent>
          <Button variant={'contained'} type="submit">
            Submit
          </Button>
        </form>
      </Box>
      <Box
        sx={{ width: { md: '50%', sm: '100%', xs: '100%' } }}
        className="markdown"
      >
        <Typography variant={'h5'}>{obj.title}</Typography>
        <MarkdownIt source={obj.markdown}></MarkdownIt>
      </Box>
    </Box>
  );
}
