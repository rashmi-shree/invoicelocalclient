import React, {useState, useEffect } from 'react';
import moment from 'moment';

const SelectDate = ({
    incomingdate,
    typeOne,
    onHandleChangeEvent,
    disable,
    selectevent
}) => {
    const [date, setDate] = useState();
    const [defaultvalue, setdefaultvalue] = useState();
    useEffect(()=>{
        const resultDate=moment(incomingdate).format('YYYY-MM-DD');
        setdefaultvalue(resultDate);
      },[incomingdate]);
    const handleChange = (e) =>{
        setdefaultvalue(e.target.value);
        // selectevent(e.target.value);
    }
    return(
        <div>
            {
                disable ?
                    <input 
                        value={defaultvalue}
                        type="date" 
                        disabled
                    />
                    :
                    <input 
                        value={defaultvalue}
                        type="date"
                        name={typeOne}
                        onChange={(e)=>{handleChange(e); onHandleChangeEvent(e)}}
                    />
            }
            
        </div>
    );
}
export default SelectDate;