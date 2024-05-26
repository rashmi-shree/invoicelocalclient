import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const CustomizedReadOnlyTextInput = ({labelname,onHandleChangeEvent, type, defaultValue,dataindex }) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        defaultValue={defaultValue} 
        name={type} 
        onChange={onHandleChangeEvent} 
        id="standard-basic" 
        label={labelname} variant="standard" 
        dataindex={dataindex}
        InputProps={{
          readOnly: true,
        }}  
      />
    </Box>
  );
}
export default CustomizedReadOnlyTextInput;