import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Select from 'react-select';

const CustomizedCombobox = ({
  comboboxdata,
  selectevent,
  selectedowner,
  dvaluestate,
  dvaluestate_code
}) => {
  const [statedata, setstatedata] = useState();
  const [defaultvalue, setdefaultvalue] = useState();
  useEffect(()=>{
    let temp = comboboxdata.map((d)=>{
      return {value:d.statecode, label:d.statename}
    })
    setstatedata(temp);
  },[comboboxdata])
  useEffect(()=>{
//     if (dvaluestate){
//       setdefaultvalue({label: dvaluestate, value: dvaluestate_code})
//     }
// else 
if(selectedowner == "SRI PARAMANANDA ENTERPRISES"){
      setdefaultvalue({label: 'Karnataka', value: 29})
    }
    else if(selectedowner == "SDD ENTERPRISES"){
      setdefaultvalue({label: 'Tamil Nadu', value: 33})
    }
  },[comboboxdata,selectedowner, dvaluestate, dvaluestate_code])
  const handleChange = e => {
    setdefaultvalue(e);
    selectevent(e);
  }
  return (
    <div className='comboboxselectstyle'>
      <Select
        placeholder="Select Option"
        value={defaultvalue}
        options={statedata} // set list of the data
        onChange={handleChange} // assign onChange function
    />
  </div>
    // <Autocomplete
    //   onChange={selectevent}
    //   id="highlights-demo"
    //   sx={{ width: 300 }}
    //   options={comboboxdata}
    //   getOptionLabel={(option) => option.statename}
    //   renderInput={(params) => (
    //     <TextField {...params} margin="normal" />
    //   )}
    //   renderOption={(props, option, { inputValue }) => {
    //     const matches = match(option.statename, inputValue);
    //     const parts = parse(option.statename, matches);

    //     return (
    //       <li {...props}>
    //         <div>
    //           {parts.map((part, index) => (
    //             <span
    //               key={index}
    //               style={{
    //                 fontWeight: part.highlight ? 700 : 400,
    //               }}
    //             >
    //               {part.text}
    //             </span>
    //           ))}
    //         </div>
    //       </li>
    //     );
    //   }}
    // />
  );
}
export default CustomizedCombobox;