import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Tooltip,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import repository from '../repository/repository';
import { getAuthentication } from './utility';

export default function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const ctx = useContext(AppContext);
  useEffect(() => {
    repository
      .findAllSubmissions({
        email: getAuthentication().email,
      })
      .then((res) => setSubmissions(res));
  }, []);

  const handleUseCodeClick = (code, language) => {
    ctx.useCode = code;
    ctx.useLanguage = language;
  };

  return (
    <Box>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant={'h4'} component={'h2'}>
          My submissions
        </Typography>
        <Divider></Divider>
        {submissions.map((submission) => (
          <Accordion key={submission.id}>
            <AccordionSummary>
              <Box
                sx={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'space-evenly',
                }}
              >
                <Typography>Problem: {submission.problem.title} </Typography>
                <Typography
                  sx={{
                    color: submission.status === 'ACCEPTED' ? 'green' : 'red',
                  }}
                >
                  STATUS: {submission.status}
                </Typography>
                <Typography>Language: {submission.language}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails
              onClick={() =>
                handleUseCodeClick(submission.code, submission.language)
              }
            >
              <Tooltip title="use code">
                <Link
                  to={`/problem/${submission.problem.id}`}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  <Typography component={'pre'}>
                    <code>{submission.code}</code>
                  </Typography>
                </Link>
              </Tooltip>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
