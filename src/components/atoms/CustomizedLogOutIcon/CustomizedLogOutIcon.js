import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import '../../../style/style.css';

const CustomizedLogOutIcon = ({onClick}) => {
    return(
        <div className='logouticoncontainer'>
            <p><LogoutIcon onClick={()=>{onClick()}} /></p>
        </div>
    );
}
export default CustomizedLogOutIcon;