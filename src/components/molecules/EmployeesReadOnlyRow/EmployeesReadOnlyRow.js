import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CustomizedEditIcon from "../../atoms/CustomizedEditIcon/CustomizedEditIcon";
import Button from '@mui/material/Button';
import '../../../style/style.css';

const EmployeesReadOnlyRow = ({
    rowdata,
    handleEditClick,
    handleDeleteClick,
    deletesuperevent
}) => {
    return (
        <tr>
            <td>{rowdata.username}</td>
            <td>{rowdata.password}</td>
            <td>
            <div className='editdeletecontainer'>
                <CustomizedEditIcon
                    type="button"
                    onClick={(event) => handleEditClick(event, rowdata)}
                />
                <div
                    className="deleteiconcontainer"
                    data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <DeleteIcon
                        id="deleteicon"
                        onClick={() => deletesuperevent(rowdata.id)}
                        // onClick={() => (deletesuperevent(data.product_hsn_code))}
                    />
                </div>
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>Are you sure you want to delete ?</p>
                            </div>
                            <div className="modal-footer">
                                <div className='btnstyle'>
                                    <Button
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-dismiss="modal"
                                        onClick={() => (handleDeleteClick("yes"))}
                                    >
                                        Confirm
                                    </Button>
                                </div>
                                <div className='btnstyle'>
                                    <Button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        onClick={() => (handleDeleteClick("no"))}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </td>
        </tr>
    );
}
export default EmployeesReadOnlyRow;