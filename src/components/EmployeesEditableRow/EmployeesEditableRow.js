import React from "react";
import CustomizedSaveIcon from "../atoms/CustomizedSaveIcon/CustomizedSaveIcon";
import CustomizedCancelIcon from "../atoms/CustomizedCancelIcon/CustomizedCancelIcon";
import '../../style/style.css';

const EmployeesEditableRow = ({
    rowdata,
    handleEditFormChange,
    handleCancelClick,
    handleEditFormSubmit
}) => {
    return (
        <tr>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a name..."
                    name="username"
                    defaultValue={rowdata.username}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a password..."
                    name="password"
                    defaultValue={rowdata.password}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <div className='editdeletecontainer'>
                    <span>
                    <CustomizedSaveIcon
                        type="submit"
                        onClick={handleEditFormSubmit}
                    />
                    </span>
                    <span>
                    <CustomizedCancelIcon
                        type="button"
                        onClick={handleCancelClick}
                    />
                    </span>
                </div>
            </td>
        </tr>
    );
}
export default EmployeesEditableRow;