import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './CustomizedComboboxwithdefaultvalue.css';

const CustomizedComboboxwithdefaultvalue = ({
  updateempidnameevent, 
  employeedata,
  changeevent,
  placeholder
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [empnameid, setempnameid] = useState([]);
  const handleChange = e => {
    setSelectedOption(e);
  }
  
  useEffect(()=>{
    let emp = employeedata.map((data)=>{
      return data;
    })
    setempnameid(emp);
  },[employeedata])
  return (
    <div className="App comboboxstyle">
      {
        selectedOption && selectedOption.length &&
        <p>{selectedOption}</p>
      }
      <Select
        placeholder={placeholder}
        value={selectedOption}
        options={empnameid}
        onChange={handleChange}
      />

    </div>
  );
}

export default CustomizedComboboxwithdefaultvalue;

