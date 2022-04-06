import Editor from '@monaco-editor/react';
import { Box, Button, Tab, Tabs } from '@mui/material';
import SelectComponent from './SelectComponent';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../App';
import repository from '../repository/repository';
import { getAuthentication, transformToSelectItems } from './utility';

export default function CodeEditor(props) {
  const { id } = useParams();
  const ctx = useContext(AppContext);

  const languages = ['cpp', 'c', 'javascript', 'java'];
  const [responseOutput, setResponseOutput] = useState('');

  const [obj, setObj] = useState({
    language: '',
    code: '',
    theme: 'vs-light',
  });

  const handleSubmitButton = (event) => {
    if (obj.language === '') {
      return;
    }
    repository
      .createSubmission({
        userId: getAuthentication().email,
        problemId: id,
        language: obj.language,
        code: obj.code,
      })
      .then((res) => setResponseOutput(res.output));
  };

  useEffect(() => {
    setObj({
      ...obj,
      code: ctx.useCode !== '' ? ctx.useCode : props.problem.starterCode,
      language: ctx.useLanguage !== '' ? ctx.useLanguage : '',
    });
  }, [props.problem]);

  return (
    <Box
      sx={{
        height: props.height || 'auto',
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
          justifyContent: 'space-between',
        }}
      >
        <Tabs
          onChange={(event, newTheme) => setObj({ ...obj, theme: newTheme })}
          value={obj.theme}
        >
          <Tab value="vs-light" label={'Light'} />
          <Tab value="vs-dark" label={'Dark'} />
        </Tabs>
        <SelectComponent
          selectItems={transformToSelectItems(languages, languages)}
          obj={obj}
          setObj={setObj}
          attr={'language'}
        ></SelectComponent>
      </Box>
      <Editor
        theme={obj.theme}
        language={obj.language}
        value={obj.code}
        height={'100%'}
        width={'100%'}
        onChange={(newCode) => setObj({ ...obj, code: newCode })}
        options={{
          automaticLayout: true,
          selectOnLineNumbers: true,
          cursorStyle: 'line',
        }}
      ></Editor>
      <Box>
        <code>{responseOutput}</code>
      </Box>
      <Button onClick={handleSubmitButton} sx={{ ml: 'auto' }}>
        Submit
      </Button>
    </Box>
  );
}
