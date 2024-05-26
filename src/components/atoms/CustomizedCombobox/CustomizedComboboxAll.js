import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Select from 'react-select';
import Autocomplete from '@mui/material/Autocomplete';
import '../../../style/style.css';

const CustomizedComboboxAll = ({
  comboboxdata,
  onChange,
  dvalue,
  selectevent
}) => {
  const [status, setstatus] = useState();
  const [defaultvalue, setdefaultvalue] = useState();
  useEffect(()=>{
    setdefaultvalue({value:dvalue, label:dvalue})
  },[dvalue])
  useEffect(()=>{
    let ds = comboboxdata.map((data)=>{
      return {value:data, label:data}
    })
    setstatus(ds);
  },[comboboxdata, dvalue])
  const handleChange = e => {
    setdefaultvalue(e);
    selectevent(e);
  }
  return (
    <div className='comboboxselectstyle'>
    <Select
      placeholder="Select Option"
      value={defaultvalue}
      options={status} // set list of the data
      onChange={handleChange} // assign onChange function
  />
  </div>
  );
}
export default CustomizedComboboxAll;