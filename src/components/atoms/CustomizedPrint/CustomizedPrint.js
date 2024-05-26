import React from "react";
import PrintIcon from '@mui/icons-material/Print';

const CustomizedPrint = ({onClick}) => {
    return(
        <PrintIcon 
            onClick = {()=>{onClick()}}
        />
    );
}
export default CustomizedPrint;