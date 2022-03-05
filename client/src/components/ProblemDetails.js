import {
  Button,
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

const languages = ['cpp', 'c', 'javascript', 'java'];

export default function ProblemDetails() {
  const [problem, setProblem] = useState({
    id: 1,
    title: 'Two Sum',
    difficulty: 'EASY',
  });

  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('vs-light');
  const [responseOutput, setResponseOutput] = useState(null);

  const obj = {
    language,
    code,
  };

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
      }}
    >
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography variant={'h6'} component={'h2'} sx={{ color: '#696969' }}>
          {problem.title}
        </Typography>
        <Box sx={{ borderTopColor: 'gray', borderTop: 1 }}>markdown here</Box>
      </Box>
      <SliderComponent></SliderComponent>
      <Box
        sx={(theme) => {
          return {
            [theme.breakpoints.down('md')]: {
              width: '100%',
            },
          };
        }}
      >
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
          width={'100%'}
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
