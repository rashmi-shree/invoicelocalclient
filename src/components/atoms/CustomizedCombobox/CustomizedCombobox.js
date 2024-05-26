import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const CustomizedCombobox = ({comboboxdata,selectevent}) => {
  return (
    <Autocomplete
        onChange={selectevent}
      id="highlights-demo"
      sx={{ width: 300 }}
      options={comboboxdata}
      getOptionLabel={(option) => option.product_name}
      renderInput={(params) => (
        <TextField {...params} margin="normal" />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.product_name, inputValue);
        const parts = parse(option.product_name, matches);

        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
}
export default CustomizedCombobox;