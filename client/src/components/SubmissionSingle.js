import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Tooltip,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

export default function SubmissionSingle(props) {
  const navigate = useNavigate();
  const ctx = useContext(AppContext);
  const handleUseCodeClick = (code, language) => {
    ctx.setUseLanguage(language);
    ctx.setUseCode(code);
  };

  const handleClick = (event) => {
    if (!props.onClick) {
      navigate(`/problem/${props.submission.problem.id}`);
      return;
    }
    props.onClick(event);
  };

  return (
    <Accordion key={props.submission.id}>
      <AccordionSummary>
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-evenly',
          }}
        >
          <Typography>Problem: {props.submission.problem.title} </Typography>
          <Typography
            sx={{
              color: props.submission.status === 'ACCEPTED' ? 'green' : 'red',
            }}
          >
            STATUS: {props.submission.status}
          </Typography>
          <Typography>Language: {props.submission.language}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        onClick={() =>
          handleUseCodeClick(props.submission.code, props.submission.language)
        }
      >
        <Tooltip title="use code">
          <Typography
            component={'pre'}
            onClick={handleClick}
            sx={{ cursor: 'pointer' }}
          >
            <code>{props.submission.code}</code>
          </Typography>
        </Tooltip>
      </AccordionDetails>
    </Accordion>
  );
}
