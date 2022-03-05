import { MenuItem, TextField } from '@mui/material';
import { capitalize } from './utility';

export default function SelectComponent(props) {
  const handleInputTextChange = (event, attr) => {
    props.obj[attr] = event.target.value;
  };
  return (
    <TextField
      select
      fullWidth
      label={capitalize(props.attr)}
      onChange={(event) => handleInputTextChange(event, props.attr)}
      defaultValue={''}
    >
      {props.selectItems.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.text}
        </MenuItem>
      ))}
    </TextField>
  );
}
