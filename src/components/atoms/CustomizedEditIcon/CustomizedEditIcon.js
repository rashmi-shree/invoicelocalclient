import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import '../../../style/style.css';

const CustomizedEditIcon = ({onClick, type}) => {
    return(
        <EditIcon 
        type={type}
        className="custediticon"
            onClick={()=>{onClick()}} />
    );
}
export default CustomizedEditIcon;