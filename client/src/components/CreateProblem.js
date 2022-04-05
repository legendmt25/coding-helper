import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import MarkdownIt from 'react-markdown-it';
import SelectComponent from './SelectComponent';
import InputComponent from './InputComponent';
import { transformToSelectItems } from './utility';
import { useNavigate } from 'react-router-dom';
import repository from '../repository/repository';

export default function CreateProblem() {
  const difficulties = ['EASY', 'MEDIUM', 'HARD'];
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    repository
      .findAllCategories()
      .then((res) => setCategories(res.map((category) => category.name)));
  }, []);

  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [starterFile, setStarterFile] = useState('');
  const [runnerFile, setRunnerFile] = useState('');
  const [testCases, setTestCases] = useState([]);
  const navigate = useNavigate();

  const obj = {
    difficulty: 0,
    category: 0,
    title: '',
  };

  useEffect(() => {
    setTitle(obj.title);
  }, [obj.title]);

  const handleAddProblem = (event) => {
    const formData = new FormData();
    formData.append('title', obj.title);
    formData.append('markdown', markdown);
    formData.append('difficulty', difficulties[obj.difficulty]);
    formData.append('categoryName', categories[obj.category]);
    formData.append('starterCode', starterFile);
    formData.append('runnerCode', runnerFile);
    for (const testCase of testCases) {
      formData.append('testCases', testCase);
    }
    repository.createProblem(formData).then((res) => navigate('/problems'));
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
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <InputComponent
          obj={obj}
          attr={'title'}
          setExplicit={setTitle}
        ></InputComponent>
        <TextField
          fullWidth
          type={'file'}
          inputProps={{ multiple: true }}
          label={'Test cases'}
          variant={'standard'}
          size={'small'}
          helperText={'Upload test cases for the problem'}
          onChange={(event) => setTestCases(event.target.files)}
          InputLabelProps={{ shrink: true }}
        ></TextField>
        <Box sx={{ display: 'flex', gap: 5 }}>
          <TextField
            fullWidth
            type={'file'}
            label={'Starter code'}
            helperText={
              'Interface code of the problem that will be shown to the user'
            }
            size={'small'}
            variant={'standard'}
            InputLabelProps={{ shrink: true }}
            onChange={(event) => setStarterFile(event.target.files[0])}
            defaultValue={obj.starterCode}
          ></TextField>
          <TextField
            fullWidth
            type={'file'}
            label={'Runner code'}
            helperText={'Code that will run with the user code'}
            size={'small'}
            variant={'standard'}
            InputLabelProps={{ shrink: true }}
            onChange={(event) => setRunnerFile(event.target.files[0])}
            defaultValue={obj.runnerCode}
          ></TextField>
        </Box>
        <TextField
          fullWidth
          label={'Markdown'}
          multiline
          sx={{ height: '100%' }}
          rows={10}
          rowsMax={20}
          helperText={'Insert text of the problem in markdown syntax'}
          defaultValue={markdown}
          onChange={(event) => setMarkdown(event.target.value)}
        ></TextField>
        <SelectComponent
          obj={obj}
          attr={'difficulty'}
          selectItems={transformToSelectItems(difficulties)}
        ></SelectComponent>
        <SelectComponent
          obj={obj}
          attr={'category'}
          selectItems={transformToSelectItems(categories)}
        ></SelectComponent>
        <Button onClick={handleAddProblem} variant={'contained'}>
          Create
        </Button>
      </Box>
      <Box
        sx={{ width: { md: '50%', sm: '100%', xs: '100%' } }}
        className="markdown"
      >
        <Typography variant={'h5'}>{title}</Typography>
        <MarkdownIt source={markdown}></MarkdownIt>
      </Box>
    </Box>
  );
}
