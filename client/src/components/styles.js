export const buttonStyle = (theme) => {
  return {
    px: 3,
    py: 1.2,
    ml: 'auto',
    alignSelf: 'flex-end',
    border: '1px #1976d2 solid',
    ':hover': {
      backgroundColor: '#1976d2',
      color: 'white',
    },
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  };
};

export const fieldsetStyle = {
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  borderColor: 'rgba(100, 100, 111, 0.2)',
  borderWidth: '0.1em',
  maxWidth: 500,
  margin: 'auto',
  borderRadius: 5,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 20,
  padding: 50,
};

export const shadow =
  '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
export const shadowTop =
  '0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 -1px 2px -1px rgb(0 0 0 / 0.1)';

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '80%', md: '60%', xl: '40%' },
  bgcolor: 'background.paper',
  boxShadow: shadow,
  p: 4,
  borderRadius: 1,
  gap: 2,
  display: 'flex',
  flexDirection: 'column',
};
