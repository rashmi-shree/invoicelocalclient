import React from "react";
import CustomizedText from "../../atoms/CustomizedText/CustomizedText";
import CustomizedSelect from "../../atoms/CustomizedSelect/CustomizedSelect";
import '../../../style/style.css';

const TextAndSelect = ({statusselect, selectlabelname, currentStatusEvent}) => {
    return(
        <div className="textandselectcontainer">
            <CustomizedText textname="filter by:" />
            <CustomizedSelect 
                currentStatusEvent={currentStatusEvent} 
                statusselect={statusselect} 
                selectlabelname={selectlabelname}
            />
        </div>
    );
}
export default TextAndSelect;