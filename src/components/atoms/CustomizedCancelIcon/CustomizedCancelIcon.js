import React from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import '../../../style/style.css';

const CustomizedCancelIcon = ({onClick, type}) => {
    return(
        <CancelIcon 
        type={type}
        className="custcancelicon"
            onClick={()=>{onClick()}} />
    );
}
export default CustomizedCancelIcon;