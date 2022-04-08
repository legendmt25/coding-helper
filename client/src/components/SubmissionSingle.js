import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Tooltip,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

export default function SubmissionSingle(props) {
  const ctx = useContext(AppContext);
  const handleUseCodeClick = (code, language) => {
    ctx.setUseLanguage(language);
    ctx.setUseCode(code);
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
          <Link
            to={`/problem/${props.submission.problem.id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Typography component={'pre'}>
              <code>{props.submission.code}</code>
            </Typography>
          </Link>
        </Tooltip>
      </AccordionDetails>
    </Accordion>
  );
}
