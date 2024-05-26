import React, { useEffect, useState } from "react";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import { editedsuccessmsg } from '../../organisms/SuccessMsg/SuccessMsg';
import SelectDate from "../../atoms/CustomizedDatepicker/SelectDate";
import axios from 'axios';
import CustomizedComboboxAll from "../../atoms/CustomizedCombobox/CustomizedComboboxAll";
import '../../../style/style.css';
import moment from 'moment';

const CustomerFollowUpForm = ({
  rowdata,
  handleClose
}) => {
  const [updaterowdata, setUpdaterowdata] = useState({
    "follow_up_call" :"0000-00-00"
  });
  const [finalstatus, setfinalstatus] = useState(["Booked", "Cancelled", "Follow Up In Progress"]);
  useEffect(() => {
    setUpdaterowdata(rowdata);
  }, [])
  const submiteventclicked = () => {
    axios.put('http://localhost:3000/customer/updateCustomerDetails',{
      params:{
        updaterowdata
      }
    })
    .then((res)=>{
      if(res){
        axios.put('http://localhost:3000/customer/updateDeliveryDetails',{
          params:{
            updaterowdata
          }
        })
        .then((res)=>{
          if(res){
            const res = editedsuccessmsg({});
            alert(res.msg);
            handleClose();
          }
        })
      }
    })
  }
  const selectevent = (event) => {
    setUpdaterowdata({ ...updaterowdata, "follow_up_call": event })
  }
  const selectevent1 = (event) => {
    setUpdaterowdata({ ...updaterowdata, "final_status":event.value })
  }
  const changeevent = (event) => {
    setUpdaterowdata({ ...updaterowdata, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <div className="pageheading">
        Edit Customer Details
      </div>
      <form className="formcontainer">
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Customer Reference No:
            </div>
            <div className="formdatainputstyle">
              <input
                defaultValue={rowdata.customer_reference_no}
                type="text"
                readOnly
                disabled
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Customer Name:
            </div>
            <div className="formdatainputstyle">
              <input
                name="customer_name"
                onChange={changeevent}
                defaultValue={rowdata.customer_name}
                type="text"
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Enquiry Date:
            </div>
            <div className="formdatainputstyle">
              <SelectDate
                type="enquiry_date"
                typeOne="enquiry_date"
                incomingdate={
                  rowdata.enquiry_date != null ?
                  moment(rowdata.enquiry_date).format('YYYY-MM-DD'):
                  rowdata.enquiry_date
                }
                disable="yes"
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Customer Address:
            </div>
            <div className="formdatainputstyle">
              <textarea
                name="customer_address"
                onChange={changeevent}
                defaultValue={rowdata.customer_address}
                type="text"
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Phone Number:
            </div>
            <div className="formdatainputstyle">
              <input
                name="phone_number"
                onChange={changeevent}
                defaultValue={rowdata.phone_number}
                type="number"
                onWheel={(e) => e.target.blur()}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Phone Number Alter One:
            </div>
            <div className="formdatainputstyle">
              <input
                name="phone_number_alter_one"
                onChange={changeevent}
                defaultValue={rowdata.phone_number_alter_one}
                type="number"
                onWheel={(e) => e.target.blur()}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Phone Number Alter Two:
            </div>
            <div className="formdatainputstyle">
              <input
                name="phone_number_alter_two"
                onChange={changeevent}
                defaultValue={rowdata.phone_number_alter_two}
                type="number"
                onWheel={(e) => e.target.blur()}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Enquired product hsn code:
            </div>
            <div className="formdatainputstyle">
              <input
                defaultValue={rowdata.product_hsn_code}
                type="number"
                readOnly
                disabled
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Enquired Product:
            </div>
            <div className="formdatainputstyle">
              <input
                defaultValue={rowdata.product}
                type="text"
                readOnly
                disabled
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Quantity:
            </div>
            <div className="formdatainputstyle">
              <input
                defaultValue={rowdata.quantity}
                type="number"
                readOnly
                disabled
                // onChange={changeevent}
                // onWheel={(e) => e.target.blur()}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Comments:
            </div>
            <div className="formdatainputstyle">
              <textarea
                name="comments"
                onChange={changeevent}
                defaultValue={rowdata.comments}
                type="text"
              />
            </div>
            {/* <div className="formdatainputstyle">
              <input
                name="comments"
                onChange={changeevent}
                value={rowdata.comments}
                type="text"
              />
            </div> */}
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Follow up call:
            </div>
            <SelectDate
                typeOne="follow_up_call"
                onHandleChangeEvent={(event) => changeevent(event)}
                incomingdate={
                    rowdata.follow_up_call != null
                        ? rowdata.follow_up_call = rowdata.follow_up_call
                        : rowdata.follow_up_call = rowdata.follow_up_call
                }
            />
            {/* <SelectDate
                onHandleChangeEvent={(event)=>selectevent(event)}
                typeOne="follow_up_call"
                incomingdate={
                  rowdata.follow_up_call != null
                        ? moment(rowdata.follow_up_call).format('YYYY-MM-DD')
                        : rowdata.follow_up_call = rowdata.follow_up_call
                }
            /> */}
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Final status:
            </div>
            <div className="formdatainputstyle">
              <CustomizedComboboxAll
                comboboxdata={finalstatus}
                dvalue={rowdata.final_status}
                selectevent={selectevent1}
              />
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
export default CustomerFollowUpForm;