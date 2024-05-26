import React, { useEffect, useState } from "react";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import { editedsuccessmsg } from '../../organisms/SuccessMsg/SuccessMsg';
import CustomizedComboboxAll from "../../atoms/CustomizedCombobox/CustomizedComboboxAll";
import axios from 'axios';
import '../../../style/style.css';
const EditDealersReportForm = ({ rowdata, handleClose }) => {
    const [updaterowdata, setUpdaterowdata] = useState();
    const [dealerstatus, setdealerstatus] = useState(["Active", "In Active"]);
    useEffect(() => {
        setUpdaterowdata(rowdata);
    }, [])
    const submiteventclicked = (e) => {
        axios.put('http://localhost:3000/dealers/updateDealersDetails', {
            params: {
                updaterowdata
            }
        })
            .then((res) => {
                if (res) {
                    const res = editedsuccessmsg({});
                    alert(res.msg);
                    handleClose();
                }
            })
    }
    const changeevent = (event) => {
        setUpdaterowdata({ ...updaterowdata, [event.target.name]: event.target.value })
    }
    const selectevent = (event) => {
        setUpdaterowdata({ ...updaterowdata, "gstin_status": event.value })
    }
    return (
        <div>
            <div className="pageheading">
                Edit Dealers Details
            </div>
            <form className="formcontainer">
                <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                        <div className="formnamestyle">
                            Enterprise Name:
                        </div>
                        <div className="formdatainputstyle">
                            <input
                                name="enterprise_name"
                                defaultValue={rowdata.enterprise_name}
                                onChange={changeevent}
                                type="text"
                            />
                        </div>
                    </label>
                </div>
                <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                        <div className="formnamestyle">
                            Enterprise Address:
                        </div>
                        <div className="formdatainputstyle">
                            <input
                                name="enterprise_address"
                                defaultValue={rowdata.enterprise_address}
                                onChange={changeevent}
                                type="text"
                            />
                        </div>
                    </label>
                </div>
                <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                        <div className="formnamestyle">
                            Proprietor Name:
                        </div>
                        <div className="formdatainputstyle">
                            <input
                                name="proprietor_name"
                                defaultValue={rowdata.proprietor_name}
                                onChange={changeevent}
                                type="text"
                            />
                        </div>
                    </label>
                </div>
                <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                        <div className="formnamestyle">
                            Proprietor Phone Number:
                        </div>
                        <div className="formdatainputstyle">
                            <input
                                name="proprietor_phone_number"
                                defaultValue={rowdata.proprietor_phone_number}
                                onChange={changeevent}
                                type="number"
                                onWheel={(e) => e.target.blur()}
                            />
                        </div>
                    </label>
                </div>
                <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                        <div className="formnamestyle">
                            GSTIN Number:
                        </div>
                        <div className="formdatainputstyle">
                            <input
                                defaultValue={rowdata.gstin_number}
                                type="text"
                                // onChange={changeevent}
                                // name="gstin_number"
                                readOnly
                            />
                        </div>
                    </label>
                </div>
                <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                        <div className="formnamestyle">
                            GSTIN Status:
                        </div>
                        <div className="formdatainputstyle">
                            <CustomizedComboboxAll
                                comboboxdata={dealerstatus}
                                dvalue={rowdata.gstin_status}
                                selectevent={selectevent}
                                />
                            {/* <CustomizedComboboxForAll
                                comboboxdata={dealerstatus}
                                selectevent={selectevent}
                                selectedvalue={rowdata.gstin_status}
                            /> */}
                        </div>
                    </label>
                </div>
                <div className="submitcontainee">
                    <CustomizedBtn
                        BtnName="submit"
                        onClick={submiteventclicked}
                    />
                </div>
            </form>
        </div>
    )
}
export default EditDealersReportForm;