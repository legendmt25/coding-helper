import { TextField } from '@mui/material';
import { capitalize } from './utility';

export default function InputComponent(props) {
  const handleInputTextChange = (event, attr) => {
    props.obj[attr] = event.target.value;
  };

  const inputLabelProps = props.type === 'date' ? { shrink: true } : {};

  return (
    <TextField
      fullWidth
      required={props.required}
      label={capitalize(props.attr)}
      type={props.type ? props.type : props.attr.toLowerCase()}
      variant="outlined"
      onChange={(event) => handleInputTextChange(event, props.attr)}
      InputLabelProps={inputLabelProps}
    ></TextField>
  );
}
