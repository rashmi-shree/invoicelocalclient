import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../../../style/style.css';

const CustomizedBtn = ({
  BtnName,
  onClick
}) => {
  return (
    <Stack spacing={2} direction="row">
      <div className='btnstyle'>
      <Button  
        variant="contained"
        onClick={()=>{onClick()}}
      >{BtnName}</Button>
      </div>
    </Stack>
  );
}

export default CustomizedBtn;