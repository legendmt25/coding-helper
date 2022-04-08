import { Box, Container, Divider, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import repository from '../repository/repository';
import SubmissionSingle from './SubmissionSingle';

export default function MySubmissions() {
  const ctx = useContext(AppContext);
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    repository
      .findAllSubmissions({ userEmail: ctx.userDetails.email })
      .then((data) => setSubmissions(data));
  }, []);

  return (
    <Box>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant={'h4'} component={'h2'}>
          My submissions
        </Typography>
        <Divider></Divider>
        {submissions.map((submission, index) => (
          <SubmissionSingle
            submission={submission}
            key={index}
          ></SubmissionSingle>
        ))}
      </Container>
    </Box>
  );
}
