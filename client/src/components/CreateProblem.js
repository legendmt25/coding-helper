import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import MarkdownIt from 'react-markdown-it';
import SelectComponent from './SelectComponent';
import InputComponent from './InputComponent';
import { transformToSelectItems } from './utility';
import { useNavigate, useParams } from 'react-router-dom';
import repository from '../repository/repository';

export default function CreateProblem(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const difficulties = ['EASY', 'MEDIUM', 'HARD'];
  const [categories, setCategories] = useState([]);
  const [obj, setObj] = useState({
    difficulty: 0,
    category: 0,
    title: '',
    markdown: '',
    starterFile: null,
    runnerFile: null,
    testCases: null,
  });

  useEffect(() => {
    repository
      .findAllCategories()
      .then((res) => setCategories(res.map((category) => category.name)));
  }, []);

  const handleAddProblem = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', obj.title);
    formData.append('markdown', obj.markdown);
    formData.append('difficulty', difficulties[obj.difficulty]);
    formData.append('categoryName', categories[obj.category]);
    formData.append('starterCode', obj.starterFile);
    formData.append('runnerCode', obj.runnerFile);
    for (const testCase of obj.testCases) {
      formData.append('testCases', testCase);
    }
    if (id) {
      repository
        .createContestProblem(id, formData)
        .then(() => navigate(-1))
        .catch((err) => alert(err));
    } else {
      repository
        .createProblem(formData)
        .then(() => navigate('/problems'))
        .catch((err) => alert(err));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        mt: 1,
        flexDirection: { sm: 'column', xs: 'column', md: 'row' },
      }}
    >
      <Box
        sx={{
          width: { md: '50%', sm: '100%', xs: '100%' },
        }}
      >
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          onSubmit={handleAddProblem}
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
            attr={'testCases'}
            type={'file'}
            multipleFiles
            helperText={'Upload test cases for the problem'}
            required
          ></InputComponent>
          <Box sx={{ display: 'flex', gap: 5 }}>
            <InputComponent
              obj={obj}
              setObj={setObj}
              attr={'starterFile'}
              type={'file'}
              helperText={
                'Interface code of the problem that will be shown to the user'
              }
              required
            ></InputComponent>
            <InputComponent
              obj={obj}
              setObj={setObj}
              attr={'runnerFile'}
              type={'file'}
              helperText={'Code that will run with the user code'}
              required
            ></InputComponent>
          </Box>
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
            Create
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
