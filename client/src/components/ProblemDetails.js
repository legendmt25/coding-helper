import {
  Button,
  Checkbox,
  Divider,
  FormGroup,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useMemo, useState } from 'react';
import SliderComponent from './SliderComponent';
import Editor from '@monaco-editor/react';
import MarkdownIt from 'react-markdown-it';
import {
  Favorite,
  FavoriteBorder,
  ThumbUp,
  ThumbUpAltOutlined,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const languages = ['cpp', 'c', 'javascript', 'java'];

export default function ProblemDetails() {
  const [problem, setProblem] = useState({});
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('vs-light');
  const [responseOutput, setResponseOutput] = useState(null);
  const { id } = useParams();
  const obj = {
    language,
    code,
  };

  useEffect(() => {
    fetch(`http://localhost:3000/problem/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => setProblem(res));
  }, [id]);

  useMemo(() => {
    obj.language = language;
    obj.code = code;
  }, [obj, language, code]);

  const handleSubmitButton = (event) => {};

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleThemeChange = (event, newTheme) => {
    setTheme(newTheme);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 1,
        height: '100%',
      }}
    >
      <Box sx={{ overflow: 'hidden', width: '50%' }}>
        <Box sx={{ mb: 1, px: 2 }}>
          <Typography variant={'h6'} component={'h2'} sx={{ color: '#696969' }}>
            {problem.title}
          </Typography>
          <FormGroup row sx={{ display: 'flex', gap: 1 }}>
            <Checkbox
              aria-labelledby="like"
              icon={<ThumbUpAltOutlined />}
              checkedIcon={<ThumbUp />}
              size={'small'}
              sx={{ p: 0, m: 0 }}
            ></Checkbox>
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              size={'small'}
              sx={{ p: 0, m: 0 }}
            ></Checkbox>
          </FormGroup>
        </Box>
        <Divider sx={{ mx: 3 }}></Divider>
        <Box sx={{ mt: 1 }}>
          <MarkdownIt source={problem.markdown}></MarkdownIt>
        </Box>
      </Box>
      <SliderComponent></SliderComponent>
      <Box sx={{ width: '50% ' }}>
        <Box
          sx={{
            width: '100%',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <Tabs onChange={handleThemeChange} value={theme}>
            <Tab value="vs-light" label={'Light'} />
            <Tab value="vs-dark" label={'Dark'} />
          </Tabs>
          <Typography
            sx={{ px: 2, userSelect: 'none', ml: 'auto', color: '#696969' }}
          >
            Language
          </Typography>
          <TextField
            onChange={handleLanguageChange}
            placeholder="Select language"
            select
            size="small"
            variant="standard"
            sx={{
              maxHeight: '1.5rem',
              width: '10rem',
              p: 0,
              textAlign: 'center',
            }}
            defaultValue={''}
          >
            {languages.map((language, index) => (
              <MenuItem
                key={index}
                sx={{ maxHeight: '1.5rem' }}
                value={language}
              >
                {language}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Editor
          width={'auto'}
          height={'30rem'}
          theme={theme}
          language={language}
          value={code}
          onChange={handleCodeChange}
          options={{
            selectOnLineNumbers: true,
            cursorStyle: 'line',
          }}
        ></Editor>
        <Box>
          Output: <code>{responseOutput}</code>
        </Box>
        <Button onClick={handleSubmitButton} sx={{ ml: 'auto' }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
