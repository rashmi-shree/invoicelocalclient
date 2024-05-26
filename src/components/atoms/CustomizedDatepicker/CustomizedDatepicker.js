import React, { useEffect, useState } from 'react';
import moment from 'moment';

const CustomizedDatepicker = ({
    type,
    incomingdate,
    selecteddateevent
}) => {
    const [date, setDate] = useState();
    const resultDate=moment(incomingdate).format('YYYY-MM-DD');
     useEffect(()=>{
       setDate(resultDate);
    },[])
    return(
        <div>
            <input 
                name={type} 
                type="date" 
                onChange={(e)=>{setDate(e.target.value); selecteddateevent(e.target.value)}}
            />
        </div>
    );
}
export default CustomizedDatepicker;