import { Checkbox, Divider, FormGroup, Modal, Typography } from '@mui/material';
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
import CodeEditor from './CodeEditor';
import repository from '../repository/repository';
import { AppContext } from '../App';
import ModalProblemSubmissions from './ModalProblemSubmissions';

export default function ProblemDetails() {
  const { problemId, contestId } = useParams();
  const [problem, setProblem] = useState({});
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const ctx = useContext(AppContext);

  useEffect(() => {
    if (!contestId) {
      repository.findProblemById(problemId).then((data) => {
        setProblem(data.problem);
        setLikes(data.likes);
      });
    } else {
      repository.getContestProblem(contestId, problemId).then((data) => {
        setProblem(data.problem);
        //setLikes(data.likes);
      });
    }

    repository.findAllSubmissions({
      userEmail: ctx.userDetails?.email,
      problemId,
    });

    if (ctx.userDetails != null)
      repository
        .isProblemLiked(problemId, { userEmail: ctx.userDetails.email })
        .then((res) => setLiked(res));
  }, [problemId]);

  const handleLikeButton = (event) => {
    if (ctx.userDetails != null)
      repository
        .likeProblem(problemId, { userEmail: ctx.userDetails.email })
        .then((data) => {
          setLiked(data);
          if (data) setLikes(likes + 1);
          else setLikes(likes - 1);
        });
    else alert('you need to login first');
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
            {likes}
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
      <CodeEditor width={'50%'} height={'100%'} problem={problem}></CodeEditor>
    </Box>
  );
}
