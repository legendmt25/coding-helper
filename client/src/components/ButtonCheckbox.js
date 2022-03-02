import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ButtonCheckBox(props) {
  const [clicked, setClicked] = useState(false);

  const buttonCheckBox = (theme) => {
    return {
      px: 2,
      py: 1,
      ml: 'auto',
      backgroundColor: clicked ? '#1976d2' : '',
      color: clicked ? 'white' : 'inherit',
      alignSelf: 'flex-end',
      border: '1px #1976d2 solid',
      ':hover': {
        backgroundColor: '#1976d2',
        color: 'white',
      },
      borderRadius: 50, 
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    };
  };

  useEffect(() => {
    if (clicked) {
      props.filters.add(props.category);
    } else {
      props.filters.delete(props.category);
    }
  }, [clicked, props.filters, props.category]);

  const handleButtonClick = () => {
    setClicked(!clicked);
  };

  return (
    <Button sx={buttonCheckBox} onClick={handleButtonClick}>
      {props.category}
    </Button>
  );
}
