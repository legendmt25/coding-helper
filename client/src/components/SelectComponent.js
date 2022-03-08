import { MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { capitalize } from './utility';

export default function SelectComponent(props) {
  const [value, setValue] = useState(0);
  const handleInputTextChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    props.obj[props.attr] = value;
  }, [value, props]);

  return (
    <TextField
      select
      fullWidth
      label={capitalize(props.attr)}
      onChange={(event) => handleInputTextChange(event, props.attr)}
      value={value}
      defaultValue={value}
    >
      {props.selectItems.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.text}
        </MenuItem>
      ))}
    </TextField>
  );
}
