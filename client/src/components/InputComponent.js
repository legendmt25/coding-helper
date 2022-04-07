import { TextField } from '@mui/material';
import { capitalize } from './utility';

export default function InputComponent(props) {
  const handleInputTextChange = (event) => {
    let value = event.target.value;
    if (props.type === 'file') {
      if (props.multipleFiles) {
        value = event.target.files;
      } else {
        value = event.target.files[0];
      }
    }
    props.setObj({ ...props.obj, [event.target.name]: value });
  };

  return (
    <TextField
      sx={{ width: props.width ? props.width : '100%' }}
      variant={props.variant ? props.variant : 'outlined'}
      value={props.type !== 'file' ? props.obj[props.attr] : undefined}
      required={props.required}
      name={props.attr}
      multiline={props.multiline}
      rows={10}
      label={props.label || capitalize(props.attr)}
      type={props.type ? props.type : props.attr.toLowerCase()}
      onChange={handleInputTextChange}
      InputLabelProps={
        props.type === 'datetime-local' ||
        props.type === 'date' ||
        props.type === 'file'
          ? { shrink: true }
          : {}
      }
      inputProps={{ multiple: props.multipleFiles }}
      helperText={props.helperText}
      size={'small'}
      disabled={props.disabled}
    ></TextField>
  );
}
