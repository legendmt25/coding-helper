import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ButtonCheckBox(props) {
  const [clicked, setClicked] = useState(false);

  const buttonCheckBox = (theme) => {
    return {
      px: 2,
      py: 1,
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
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.73rem',
      },
      fontSize: '0.8rem',
    };
  };

  useEffect(() => {
    if (clicked) {
      props.setFilters([...props.filters, props.category]);
    } else {
      const ind = props.filters.indexOf(props.category);
      props.filters.splice(ind, 1)
      props.setFilters([...props.filters]);
    }
  }, [clicked, props.setFilters, props.category]);

  const handleButtonClick = () => {
    setClicked(!clicked);
  };

  return (
    <Button sx={buttonCheckBox} onClick={handleButtonClick} size="small">
      {props.category}
    </Button>
  );
}
