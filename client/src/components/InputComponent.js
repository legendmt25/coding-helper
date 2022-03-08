import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { capitalize } from './utility';

export default function InputComponent(props) {
  const [value, setValue] = useState('');
  const handleInputTextChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    props.obj[props.attr] = value;
    if (typeof props.setExplicit == 'function') {
      props.setExplicit(value);
    }
  }, [value, props]);

  const inputLabelProps = props.type === 'date' ? { shrink: true } : {};

  return (
    <TextField
      fullWidth
      value={value}
      defaultValue={value}
      required={props.required}
      label={capitalize(props.attr)}
      type={props.type ? props.type : props.attr.toLowerCase()}
      variant="outlined"
      onChange={handleInputTextChange}
      InputLabelProps={inputLabelProps}
    ></TextField>
  );
}
