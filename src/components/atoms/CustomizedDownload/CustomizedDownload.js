import React from "react";
import DownloadIcon from '@mui/icons-material/Download';
import '../../../style/style.css';

const CustomizedDownload = ({onClick}) => {
    return(
        <DownloadIcon 
            className="downloadicon"
            onClick={()=>{onClick()}}
        />
    );
}
export default CustomizedDownload;