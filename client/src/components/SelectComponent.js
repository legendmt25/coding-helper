import { MenuItem, TextField } from '@mui/material';
import { capitalize } from './utility';

export default function SelectComponent(props) {
  const handleInputTextChange = (event) => {
    props.setObj({ ...props.obj, [event.target.name]: event.target.value });
  };
  return (
    <TextField
      select
      sx={{ width: props.width ? props.width : '100%' }}
      label={capitalize(props.attr)}
      onChange={handleInputTextChange}
      value={props.obj[props.attr]}
      name={props.attr}
      required={props.required}
      variant={props.variant ?? 'outlined'}
    >
      {props.selectItems.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.text}
        </MenuItem>
      ))}
    </TextField>
  );
}
