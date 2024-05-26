import React from 'react';
import CustomizedText from '../../atoms/CustomizedText/CustomizedText';
import CustomizedTextInput from '../../atoms/CustomizedTextInput/CustomizedTextInput';
import '../../../style/style.css';

const TextAndTextInput = ({
    textname,
    inputChangeEvent,
    onChangeEvent,
    type,
    typeofinput,
    onKeyPress
}) => {
    return(
        <div className='textandtextcontainer'>
            <CustomizedText textname={textname}/>
            <CustomizedTextInput
                type={type} 
                typeofinput={typeofinput}
                onHandleChangeEvent={onChangeEvent}
                inputChangeEvent={inputChangeEvent}
                onKeyPress={onKeyPress}
            />
        </div>
    );
}
export default TextAndTextInput;