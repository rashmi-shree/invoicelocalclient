import React from 'react';
import logo from '../../../images/logo.png';
import '../../../style/style.css';

const CustomizedLogo = ({
    onClick
}) => {
    return(
        <div className='imagecontainer'>
            <img src={logo} onClick={onClick} />
        </div>
    );
}
export default CustomizedLogo;
