import React from "react";
import CustomizedTextInput from "../CustomizedTextInput/CustomizedTextInput";
import CustomizedBtn from '../CustomizedBtn/CustomizedBtn';
import '../../../style/style.css';

const CustomizedSearchBar = ({
    goEventClicked,
    onHandleChangeEvent,
    type,
    labelname,
    Btnname,
    onKeyPress
    }) => {
    return(
        <div className="custsearchbarcontainer">
            <CustomizedTextInput 
                type={type} 
                onHandleChangeEvent={onHandleChangeEvent} 
                labelname={labelname}
                onKeyPress={onKeyPress}
            />
            <CustomizedBtn 
                onClick={goEventClicked} 
                BtnName={Btnname} 
            />
        </div>
    );
}
export default CustomizedSearchBar;