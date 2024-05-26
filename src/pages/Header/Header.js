import React from "react";
import CustomizedLogo from '../../components/atoms/CustomizedLogo/CustomizedLogo';
import { useNavigate } from 'react-router-dom';
import '../../style/style.css';

const Header = ({
}) => {
    let navigate = useNavigate();
    return (
        <div className="headercontainer">
            <div className="containeritems" >
                <CustomizedLogo 
                    onClick={()=>{
                        navigate('/');
                    }}
                />
                <div className="companyname">SHREE PARAMANANDA ENTERPRISES</div>
            </div>
        </div>
    );
}
export default Header;