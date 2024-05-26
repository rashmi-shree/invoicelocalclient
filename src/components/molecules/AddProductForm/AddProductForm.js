import React, { useState } from "react";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import moment from 'moment';
import { addedsuccessmsg } from '../../organisms/SuccessMsg/SuccessMsg';
import axios from 'axios';
import CustomizedComboboxForOwner from "../../atoms/CustomizedCombobox/CustomizedCombobboxForOwner";
import CustomizedComboboxAll from "../../atoms/CustomizedCombobox/CustomizedComboboxAll";
import '../../../style/style.css';
const AddProductForm = ({ handleClose }) => {
  const [customerdata, setcustomerdata] = useState();
  const [productstatus, setproductstatus] = useState(['Available', 'Not Available']);
  const [errors, seterrors] = useState({
    commonError:"please enter all important fields"
  })
  const [owner, setowner] = useState([
    {"ownerid":1,
    "ownername":"SDD ENTERPRISES"},
    {"ownerid":2,
    "ownername":"SRI PARAMANANDA ENTERPRISES"}]);
    const [selectedowner, setselectedowner] = useState("SRI PARAMANANDA ENTERPRISES");
  let finalCustomerRefNo = '';
  const generateCustomerReferenceNo = () => {
    let s1 = "CUST2022";
    let min = 0;
    let max = 1000;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    finalCustomerRefNo = s1 + random;
  }
  generateCustomerReferenceNo();
  let finalcurrentdate = "";
  const currentDate = () => {
    let date = new Date();
    finalcurrentdate = moment(date).format('YYYY-MM-DD');
  }
  currentDate();
  const validate = () => {
    let ce = "";
    if (!customerdata || !customerdata.product_name || !selectedowner || !customerdata.product_hsn_code ||
      !customerdata.product_description || !customerdata.unit_of_measure || !customerdata.rate_per_unit ||
      !customerdata.gst_rate || !customerdata.product_status || !customerdata.product_status || 
      !customerdata.owner_address || !customerdata.owner_contact_one || !customerdata.owner_contact_two ||
      !customerdata.stock || !customerdata.discount 
      ){
      ce = "please enter all important fields";
    }
    if(ce){
      seterrors({...errors, ["commonError"]:ce});
      return false;
    }
    return true;
  }
  const submiteventclicked = () => {
    const isvalid = validate();
    if(isvalid){
      axios.post('http://localhost:3000/product/addProductData', {
        params: {
          data: customerdata,
          selectedowner:selectedowner
        }
      })
        .then((res) => {
          if (res) {
            const res = addedsuccessmsg({})
            alert(res.msg);
            handleClose();
          }
        })
    }
    else {
      alert(errors.commonError );
    }
  }
  const selecteventforowner = (e) => {
    setselectedowner(e.label);
  }
  const changeevent = (event) => {
    setcustomerdata({ ...customerdata, [event.target.name]: event.target.value })
  }
  const selectevent = (event) => {
    setcustomerdata({ ...customerdata, "product_status": event.value })
  }
  // const handleKeypress = (e) => {
  //       //it triggers by pressing the enter key
  //     if (e.key === 'Enter') {
  //       submiteventclicked();
  //       e.preventDefault();
  //     }
  //   };
  return (
    <div>
      <div className="pageheading">
        Add Product Details
      </div>
      <form className="formcontainer">
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Product Name:
            </div>
            <div className="formdatainputstyle">
              <input
                name="product_name"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Owner Company:
            </div>
            <div className="formdatainputstyle">
            <CustomizedComboboxForOwner
                comboboxdata={owner}
                // type="state"
                selectevent={selecteventforowner}
              />
              {/* <input
                name="owner_company"
                type="text"
                onChange={changeevent}
              /> */}
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Owner Address:
            </div>
            <div className="formdatainputstyle">
              <textarea
                name="owner_address"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Owner Contact One:
            </div>
            <div className="formdatainputstyle">
              <input
                name="owner_contact_one"
                type="number"
                onWheel={(e) => e.target.blur()}
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Owner Contact Two:
            </div>
            <div className="formdatainputstyle">
              <input
                name="owner_contact_two"
                type="number"
                onWheel={(e) => e.target.blur()}
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Product hsn code:
            </div>
            <div className="formdatainputstyle">
              <input
                name="product_hsn_code"
                type="number"
                onWheel={(e) => e.target.blur()}
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Product description:
            </div>
            <div className="formdatainputstyle">
              <input
                name="product_description"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Unit of measure:
            </div>
            <div className="formdatainputstyle">
              <input
                name="unit_of_measure"
                type="text"
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>rate per unit:
            </div>
            <div className="formdatainputstyle">
              <input
                name="rate_per_unit"
                type="number"
                onWheel={(e) => e.target.blur()}
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>gst rate:
            </div>
            <div className="formdatainputstyle">
              <input
                name="gst_rate"
                type="number"
                onWheel={(e) => e.target.blur()}
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Product status:
            </div>
            <div className="formdatainputstyle">
              <CustomizedComboboxAll 
                  comboboxdata={productstatus}
                  selectevent={selectevent}
                />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>stock:
            </div>
            <div className="formdatainputstyle">
              <input
                name="stock"
                type="number"
                onWheel={(e) => e.target.blur()}
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>discount:
            </div>
            <div className="formdatainputstyle">
              <input
                name="discount"
                type="number"
                onWheel={(e) => e.target.blur()}
                onChange={changeevent}
              />
            </div>
          </label>
        </div>
        <div className="submitcontainee">
          <CustomizedBtn
            BtnName="submit"
            onClick={submiteventclicked}
            // onKeyPress={handleKeypress}
          />
        </div>
      </form>
    </div>
  )
}
export default AddProductForm;