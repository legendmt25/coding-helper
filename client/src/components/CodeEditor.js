import Editor from '@monaco-editor/react';
import {
  Box,
  Button,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../App';
import { getAuthentication } from './utility';

export default function CodeEditor(props) {
  const languages = ['cpp', 'c', 'javascript', 'java'];
  const { id } = useParams();
  const ctx = useContext(AppContext);

  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('vs-light');
  const [responseOutput, setResponseOutput] = useState('');

  const handleSubmitButton = (event) => {
    fetch('http://localhost:3000/submission/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAuthentication().jwttoken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        userId: getAuthentication().email,
        problemId: id,
        language,
        code,
      }),
    })
      .then((res) => res.json())
      .then((res) => setResponseOutput(res.output));
  };

  useEffect(() => {
    if (ctx.useCode !== '') {
      setCode(ctx.useCode);
    } else {
      setCode(props.problem.starterCode);
    }
    if (ctx.useLanguage !== '') {
      setLanguage(ctx.useLanguage);
    }
  }, [props.problem]);

  return (
    <Box
      sx={{
        width: props.width || 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Tabs onChange={(event, newTheme) => setTheme(newTheme)} value={theme}>
          <Tab value="vs-light" label={'Light'} />
          <Tab value="vs-dark" label={'Dark'} />
        </Tabs>
        <Typography
          sx={{ px: 2, userSelect: 'none', ml: 'auto', color: '#696969' }}
        >
          Language
        </Typography>
        <TextField
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
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
            <MenuItem key={index} sx={{ maxHeight: '1.5rem' }} value={language}>
              {language}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Editor
        theme={theme}
        language={language}
        value={code}
        onChange={(newCode) => setCode(newCode)}
        options={{
          automaticLayout: true,
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
  );
}
