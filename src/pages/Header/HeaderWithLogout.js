import React from "react";
import CustomizedLogo from '../../components/atoms/CustomizedLogo/CustomizedLogo';
import CustomizedLogOutIcon from '../../components/atoms/CustomizedLogOutIcon/CustomizedLogOutIcon';
import { useNavigate } from 'react-router-dom';
import '../../style/style.css';

const Header = () => {
    let navigate = useNavigate();
    return (
        <div className="headercontainer">
            <div className="containeritems" >
                <CustomizedLogo
                    onClick={()=>{
                        navigate('/main');
                    }}
                />
                <div className="companyname">SHREE PARAMANANDA ENTERPRISES</div>
                <CustomizedLogOutIcon onClick={()=>{
                        navigate('/');
                        window.localStorage.setItem('logoutbtn', null);
                        window.localStorage.setItem('adminloggedin', null);
                    }} />
            </div>
        </div>
    );
}
export default Header;