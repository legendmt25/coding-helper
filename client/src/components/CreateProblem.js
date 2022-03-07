import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import MarkdownIt from 'react-markdown-it';

export default function CreateProblem() {
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');

  const handleAddProblem = (event) => {};

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        mt: 1,
        flexDirection: { sm: 'column', xs: 'column', md:'row' },
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
        <TextField
          fullWidth
          label={'Title'}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        ></TextField>
        <TextField
          fullWidth
          type={'file'}
          inputProps={{ multiple: true }}
          label={'Test cases'}
          variant={'standard'}
          size={'small'}
          helperText={'Upload test cases for the problem'}
          InputLabelProps={{ shrink: true }}
        ></TextField>
        <TextField
          fullWidth
          label={'Markdown'}
          multiline
          sx={{ height: '100%' }}
          rows={10}
          rowsMax={20}
          helperText={'Insert text of the problem in markdown syntax'}
          value={markdown}
          onChange={(event) => setMarkdown(event.target.value)}
        ></TextField>
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
