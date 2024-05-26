import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, productName, theme) {
  return {
    fontWeight:
      productName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CustomizedComboboxMultipleSelect = ({
  comboboxdata,
  selectedproducts
}) => {
  const theme = useTheme();
  const [productName, setProductName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProductName(
      typeof value === 'string' ? value.split(',') : value,
    );
    selectedproducts(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={productName}
          onChange={handleChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
        >
          {comboboxdata.map((name) => (
            <MenuItem
              key={name.product_name}
              value={name.product_name}
              style={getStyles(name, productName, theme)}
            >
              {name.product_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CustomizedComboboxMultipleSelect;
