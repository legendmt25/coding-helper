import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import repository from '../repository/repository';
import { modalStyle } from './styles';
import SubmissionSingle from './SubmissionSingle';

export default function ModalProblemSubmissions(props) {
  const ctx = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    repository
      .findAllSubmissions({
        userEmail: ctx.userDetails.email,
        problemId: props.problemId,
      })
      .then((data) => setSubmissions(data));
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Submissions</Button>
      <Modal open={open} onClose={() => setOpen(!open)}>
        <Box sx={modalStyle}>
          <Typography variant={'h5'} component={'h3'}>
            Submissions
          </Typography>
          <Divider></Divider>
          {submissions.map((submission, index) => (
            <SubmissionSingle
              onClick={(event) => setOpen(!open)}
              submission={submission}
              key={index}
            ></SubmissionSingle>
          ))}
          {!submissions.length && "You haven't submitted anything yet"}
        </Box>
      </Modal>
    </>
  );
}
