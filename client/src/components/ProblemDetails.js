import { Checkbox, Divider, FormGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import SliderComponent from './SliderComponent';
import MarkdownIt from 'react-markdown-it';
import '../index.css';
import {
  Favorite,
  FavoriteBorder,
  ThumbUp,
  ThumbUpAltOutlined,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { getAuthentication } from './utility';
import CodeEditor from './CodeEditor';
import { AppContext } from '../App';

export default function ProblemDetails() {
  const [problem, setProblem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/problem/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAuthentication().jwttoken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setProblem(res);
      });
  }, [id]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 1,
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box sx={{ px: 2 }}>
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
        <Divider></Divider>
        <Box sx={{ px: 2 }} className={'markdown'}>
          <MarkdownIt source={problem.markdown}></MarkdownIt>
        </Box>
      </Box>
      <SliderComponent></SliderComponent>
      <CodeEditor width={'50%'} problem={problem}></CodeEditor>
    </Box>
  );
}
