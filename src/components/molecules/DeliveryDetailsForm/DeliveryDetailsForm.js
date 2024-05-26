import React, { useEffect, useState } from "react";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import { editedsuccessmsg } from '../../organisms/SuccessMsg/SuccessMsg';
import SelectDate from "../../atoms/CustomizedDatepicker/SelectDate";
import CustomizedComboboxAll from "../../atoms/CustomizedCombobox/CustomizedComboboxAll";
import axios from 'axios';
import moment from 'moment';
import '../../../style/style.css';

const DeliveryDetailsForm = ({ rowdata, handleClose }) => {
  const [updaterowdata, setUpdaterowdata] = useState();
  const [paymentstatus, setpaymentstatus] = useState(["Paid", "Pending"]);
  const [deliverstatus, setdeliverstatus] = useState(["Delivered", "Not Delivered", "Cancelled"]);
  useEffect(() => {
    setUpdaterowdata(rowdata);
  }, [])
  const [comboboxdata, setComboboxdata] = useState();
  useEffect(() => {
    axios.get(`http://localhost:3000/product/displayProductDetailsDataforcombobox`)
    .then((res)=>{
      var data = res.data;
      let productnamesarray = [];
        data.map((d) => {
          productnamesarray.push(d.product_name);
        })
        setComboboxdata(productnamesarray);
    })
  }, [])
  const [updatedPaymentstatus, setupdatedPaymentstatus] = useState('');
  const [updatedDeliverystatus, setupdatedDeliverystatus] = useState('');
  const paymentstatusevent = (e) => {
    setupdatedPaymentstatus(e);
  }
  const deliverystatusevent = (e) => {
    setupdatedDeliverystatus(e);
  }
  const submiteventclicked = () => {
    axios.put(`http://localhost:3000/product/updateProductsDetailsProductDataIncrement`,{
      params:{
        updaterowdata
      }
    })
    axios.put(`http://localhost:3000/delivery/updateDeliveryDetails`,{
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
  const selectevent = (event) =>{
    setUpdaterowdata({ ...updaterowdata, "delivery_status": event.value })
  }
  const changeevent = (event) => {
    setUpdaterowdata({ ...updaterowdata, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <div className="pageheading">
        Edit Delivery Details
      </div>
      <form className="formcontainer">
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Customer Reference Number:
            </div>
            <div className="formdatainputstyle">
              <input
                defaultValue={rowdata.customer_reference_no}
                readOnly
                disabled
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Product Sl No:
            </div>
            <div className="formdatainputstyle">
              <input
                defaultValue={rowdata.product_sl_no}
                onChange={changeevent}
                name="product_sl_no"
                type="number"
                onWheel={(e) => e.target.blur()}
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
              Booked Date:
            </div>
            <div className="formdatainputstyle">
             <SelectDate
              type="booked_date"
              typeOne="booked_date"
              incomingdate={
                rowdata.booked_date != null ?
                moment(rowdata.booked_date).format('YYYY-MM-DD'):
                rowdata.booked_date
              }
              disable="yes"
            /> 
          </div>
            
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Requested Delivery Date:
            </div>
            <div className="formdatainputstyle">
            <SelectDate
              type="requested_delivery_date"
              typeOne="requested_delivery_date"
              incomingdate={
                rowdata.requested_delivery_date != null ?
                moment(rowdata.requested_delivery_date).format('YYYY-MM-DD'):
                rowdata.requested_delivery_date
              }
              disable="yes"
            />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Delivery Date:
            </div>
            <div className="formdatainputstyle">
            <SelectDate
              type="delivery_date"
              typeOne="delivery_date"
              incomingdate={
                rowdata.delivery_date != null ?
                moment(rowdata.delivery_date).format('YYYY-MM-DD'):
                rowdata.delivery_date
              }
              disable="yes"
            />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Invoice number:
            </div>
            <div className="formdatainputstyle">
              <input
                defaultValue={rowdata.invoice_no}
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
              Phone Number Alter (one):
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
              Phone Number Alter (two):
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
              Product Hsn Code:
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
              Product:
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
                name="quantity"
                readOnly
                disabled
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Rate:
            </div>
            <div className="formdatainputstyle">
              <input
                defaultValue={rowdata.rate}
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
              Discount:
            </div>
            <div className="formdatainputstyle">
              <input
                defaultValue={rowdata.discount}
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
              CGST:
            </div>
            <div className="formdatainputstyle">
              <input
                defaultValue={rowdata.cgst}
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
              SGST:
            </div>
            <div className="formdatainputstyle">
              <input
                defaultValue={rowdata.sgst}
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
              IGST:
            </div>
            <div className="formdatainputstyle">
              <input
                defaultValue={rowdata.igst}
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
              Final Amount:
            </div>
            <div className="formdatainputstyle">
              <input
                name="final_amount"
                defaultValue={rowdata.final_amount}
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
              Balance Amount:
            </div>
            <div className="formdatainputstyle">
              <input
                name="balance_amount"
                defaultValue={rowdata.balance_amount}
                type="number"
                onChange={changeevent}
                onWheel={(e) => e.target.blur()}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Payment Status:
            </div>
            <div className="formdatainputstyle">
            <input
                name="balance_amount"
                defaultValue={rowdata.payment_status}
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
              Booking Advance Amount:
            </div>
            <div className="formdatainputstyle">
              <input
                name="booking_advance_amount"
                onHandleChangeEvent={changeevent}
                defaultValue={rowdata.booking_advance_amount}
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
              Delivery Status:
            </div>
             <div className="formdatainputstyle">
             <CustomizedComboboxAll 
                comboboxdata={deliverstatus}
                dvalue={rowdata.delivery_status}
                selectevent={selectevent}
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
export default DeliveryDetailsForm;