import React from "react";
import '../../../style/style.css';

const CustomizedText = ({textname}) => {
    return(
        <div className="customizedtextcontainer customizedaltertextdesign">
            <p>{textname}</p>
        </div>
    );
}
export default CustomizedText;