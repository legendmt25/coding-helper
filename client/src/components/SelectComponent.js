import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { capitalize } from './utility';

export default function SelectComponent(props) {
  const handleInputTextChange = (event, attr) => {
    props.obj[attr] = event.target.value;
  };
  return (
    <FormControl fullWidth>
      <InputLabel>{capitalize(props.attr)}</InputLabel>
      <Select
        label={capitalize(props.attr)}
        onChange={(event) => handleInputTextChange(event, props.attr)}
      >
        {props.selectItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
