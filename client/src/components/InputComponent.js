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
      sx={{
        width: props.width || '100%',
        height: props.fullHeight ? '100%' : 'auto',
      }}
      variant={props.variant || 'outlined'}
      value={props.type !== 'file' ? props.obj[props.attr] : undefined}
      required={props.required}
      name={props.attr}
      multiline={props.multiline}
      minRows={10}
      rows={props.rows}
      maxRows={20}
      label={props.label || capitalize(props.attr)}
      type={props.type || props.attr.toLowerCase()}
      onChange={handleInputTextChange}
      InputLabelProps={
        props.type === 'datetime-local' ||
        props.type === 'date' ||
        props.type === 'file'
          ? { shrink: true }
          : {}
      }
      inputProps={{
        multiple: props.multipleFiles,
        style: { flex: props.fullHeight ? '0 1 100%' : '' },
      }}
      InputProps={{
        style: { flex: props.fullHeight ? '0 1 100%' : '' },
      }}
      helperText={props.helperText}
      size={'small'}
      disabled={props.disabled}
    ></TextField>
  );
}
