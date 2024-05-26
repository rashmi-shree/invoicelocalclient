import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../../../style/style.css';

const CustomizedSelect = ({statusselect,selectlabelname,currentStatusEvent})=> {
  const [age, setAge] = React.useState('');
  const [finalstatus, setFinalstatus] = React.useState();
  const handleChange = (event) => {
    setAge(event.target.value);
    setFinalstatus(event.target.value);
  };
  React.useEffect(()=>{
    currentStatusEvent(finalstatus);
  },[finalstatus])
  return (
    <div className='customizedselectcontainer'>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">{selectlabelname}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            statusselect && statusselect.length &&
            statusselect.map((data)=>(
            <MenuItem 
              value={data}  
              onChange={handleChange}
            >{data}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
}
export default CustomizedSelect;