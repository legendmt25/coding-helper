import { Checkbox, Divider, FormGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
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

export default function ProblemDetails() {
  const [problem, setProblem] = useState({});
  const [liked, setLiked] = useState(false);
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

    fetch(`http://localhost:3000/problem/${id}/is_liked`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAuthentication().jwttoken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        userEmail: getAuthentication().email,
      }),
    })
      .then((res) => res.json())
      .then((res) => setLiked(res));
  }, [id]);

  const handleLikeButton = (event) => {
    fetch(`http://localhost:3000/problem/${id}/like`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAuthentication().jwttoken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        userEmail: getAuthentication().email,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLiked(res);
        if (res) {
          problem.likes++;
        } else {
          problem.likes--;
        }
        setProblem({ ...problem });
      });
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
              onClick={handleLikeButton}
              checked={liked}
            ></Checkbox>
            {problem.likes}
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
