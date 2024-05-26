import React, { useEffect, useState } from "react";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import moment from 'moment';
import { customeraddedsuccessmsg } from '../../organisms/SuccessMsg/SuccessMsg';
import CustomizedComboboxForState from '../../atoms/CustomizedCombobox/CustomizedComboboxForState';
import CustomizedComboboxMultipleSelect from '../../atoms/CustomizedComboboxMultipleSelect/CustomizedComboboxMultipleSelect';
import CustomizedComboboxForOwner from "../../atoms/CustomizedCombobox/CustomizedCombobboxForOwner";
import '../../../style/style.css';
import axios from 'axios';

const AddFewCustomersForm = ({
  handleClose,
  api
}) => {
  const [customerdata, setcustomerdata] = useState(
    {
      customerReferenceNo: "",
      enquiryDate: "",
      customerName: "",
      customerAddress: "",
      // statename: { value: 29, label: 'Karnataka' },
      statename: "",
      phoneno: "",
      phonenoalterone: "",
      phonenoaltertwo: "",
      finalStatus: "",
      phone_number: "",
      phone_number_alter_one: "",
      phone_number_alter_two: "",
      product_hsn_code: "",
      product: "",
      quantity: "",
      customer_name: "",
      owner_company:"SRI PARAMANANDA ENTERPRISES"
    }
  );

  const [errors, seterrors] = useState({
    commonError:"Please Enter all Important Fields",
    // customerNameError:"",
    // customerAddressError:"",
    // phoneNumberError:"",
    // enquiredProductError:""
  })
  const [comboboxdata, setComboboxdata] = useState([]);
  console.log("comboboxdata",comboboxdata);
  const [productname, setProductname] = useState("");
  const [producthsn, setProducthsn] = useState();
  const [state, setstate] = useState([]);
  const [owner, setowner] = useState([
    {"ownerid":1,
    "ownername":"SDD ENTERPRISES"},
    {"ownerid":2,
    "ownername":"SRI PARAMANANDA ENTERPRISES"}]);
    const [selectedowner, setselectedowner] = useState("SRI PARAMANANDA ENTERPRISES")
  const [products, setproducts] = useState([]);
  const [statecode, setstatecode] = useState("");
  const [producthsncodeonly, setproducthsncodeonly] = useState();
  const [productnameonly, setproductnameonly] = useState();
  const [productquantityonly, setproductquantityonly] = useState();
  useEffect(() => {
    axios.get('http://localhost:3000/stateandstatecodes/getstateandstatecodes', {})
      .then((res) => {
        setstate(res.data);
      })
  }, [])
  let finalCustomerRefNo = '';
  const generateCustomerReferenceNo = () => {
    let s1 = "CUST2022";
    let min = 0;
    let max = 1000;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    finalCustomerRefNo = s1 + random;
  }
  generateCustomerReferenceNo();
  let finalpreInvoiceNo = '';
  const generatePreInvoiceNo = () => {
    let s1 = 'p';
    let min = 0;
    let max = 1000;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    finalpreInvoiceNo = s1 + "2022" + random;
  }
  generatePreInvoiceNo();
  let finalcurrentdate = "";
  const currentDate = () => {
    let date = new Date();
    finalcurrentdate = moment(date).format('YYYY-MM-DD');
  }
  useEffect(() => {
    axios.post('http://localhost:3000/product/displayProductDetailsDataforcombobox', {
      params:{
        selectedowner
      }
    })
      .then((res) => {
        setComboboxdata(res.data);
      })
  }, [])
  currentDate();
  useEffect(() => {
    axios.post('http://localhost:3000/stateandstatecodes/fetchstatecode', {
      params:{
        statename: customerdata != undefined ? customerdata.statename : null
      }

      // params: {
      //   statename: customerdata != undefined ? customerdata.statename.value : null
      // }
    })
      .then((res) => {
        setstatecode(res.data);
      })
  }, [customerdata])
  const validate = () => {
    let nameError = "";
    let addressError = "";
    let phoneError = "";
    let productError = "";
    let ce = "";
if (!customerdata || !customerdata.customer_name || !customerdata.customer_address 
   ||!customerdata.phone_number ||  products.length == 0){
    ce = "Please Enter all Important Fields";
   }
    if( ce
      ){
      seterrors({...errors, ["commonError"]:ce
    });
      return false;
    }
    return true;
  }
  const submiteventclicked = () => {
     const isvalid = validate();
     if(isvalid){
        axios.post('http://localhost:3000/customer/addCustomerFollowUpData',
      {
        params: {
          customerReferenceNo: finalCustomerRefNo,
          owner_company:customerdata.owner_company,
          enquiryDate: finalcurrentdate,
          customerName: customerdata.customer_name,
          customerAddress: customerdata.customer_address,
          statename: customerdata.statename,
          phoneno: customerdata.phone_number,
          phonenoalterone: customerdata.phone_number_alter_one,
          phonenoaltertwo: customerdata.phone_number_alter_two,
          finalStatus: 'Follow up in progress'
        }
      })
      api.post('delivery/addDeliveryData', {
        params: {
          customerReferenceNo: finalCustomerRefNo,
          customerAddress: customerdata.customer_address,
          statename: customerdata.statename,
          phone_number: customerdata.phone_number,
          phone_number_alter_one: customerdata.phone_number_alter_one,
          phone_number_alter_two: customerdata.phone_number_alter_two,
          product_hsn_code: producthsncodeonly,
          product: productnameonly,
          quantity: productquantityonly,
          customer_name: customerdata.customer_name,
          owner_company: customerdata.owner_company
        }
      })
        .then((res) => {
          if(res){
            const res = customeraddedsuccessmsg({})
            alert(res.msg);
            handleClose();
          }
     
      })
    
    //   seterrors({...errors, ["customerNameError"]:"", 
    //   ["customerAddressError"]:"", 
    //   ["phoneNumberError"]:""
    // });
   
    }
     else {
       alert(errors.commonError);
     }
  }
  const selectevent = (e) => {
    setProductname(e.target.outerText);
  }
  const selecteventforstate = (e) => {
    setcustomerdata({ ...customerdata, "statename": e })
  }
  const recalldisplayProductDetailsDataforcomboboxevent = (selectedowner) => {
    api.post('product/displayProductDetailsDataforcombobox', {
      params:{
        selectedowner
      }
    })
      .then((res) => {
        setComboboxdata(res.data);
      })
  }

  const selecteventforowner = (e) => {
    setselectedowner(e.label);
    // if(e.label == "SRI PARAMANANDA ENTERPRISES"){
    //   setcustomerdata({ ...customerdata , "statename": {value: 29, label: 'Karnataka'}})
    // }
    // else if(e.label == "SDD ENTERPRISES"){
    //   setcustomerdata({ ...customerdata , "statename": {value: 33, label: 'Tamil Nadu'}})
    // }
    recalldisplayProductDetailsDataforcomboboxevent(e.label);
    setcustomerdata({ ...customerdata, "owner_company": e.label})
    // if (e.label == "SDD ENTERPRISES"){
    //   setcustomerdata({ ...customerdata, "owner_company": e.label,  "statename": {label: 'Tamil Nadu', value: 33 }})
    // }
    // else if (e.label == "SRI PARAMANANDA ENTERPRISES"){
    //   setcustomerdata({ ...customerdata, "owner_company": e.label,  "statename": {label: 'Karnataka', value: 29}})
    // }
  }

  const selectedproducts = (e) => {
    let selectedproducts = e.map((data) => {
      return { productname: data, quantity: 1 }
    })
    setproducts(selectedproducts);
  }
  useEffect(() => {
    if (products != null) {
      let s = "";
      let tempproductname = [];
      let tempproductquantity = [];
      products.map((data) => {
        tempproductname.push(data.productname);
        tempproductquantity.push(data.quantity);
        s += data.productname + ",";
      })
      setproductnameonly(tempproductname);
      setproductquantityonly(tempproductquantity);
      axios.post('http://localhost:3000/product/fetchproducthsnfromproductdetails', {
        params: {
          product_name: s
        }
      })
        .then((res) => {
          setProducthsn(res.data);
        })
    }
  }, [products])
  useEffect(() => {
    let temparray = [];
    if (producthsn != null) {
      producthsn.map((data) => {
        temparray.push(data.product_hsn_code)
      })
    }
    setproducthsncodeonly(temparray);
  }, [producthsn])
  const incrementclicked = (data) => {
    var productstock;
    axios.post('http://localhost:3000/product/getquantitybasedonproductname',{
        params:data
    })
    .then((res)=>{
        productstock = res.data
        productstock.map((d)=>{
            var stock = d.stock;
            let selectedproductdetails = products.map((product) => {
                if (product.productname == data.productname) {
                    if (stock >product.quantity){
                        product.quantity += 1;
                    }
                    else{
                        alert(`only ${stock} stocks available`);
                    }
                }
                return product;
              });
              setproducts(selectedproductdetails);
        })
    })

  }
  const decrementclicked = (data) => {
    let selectedproductdetails = products.map((product) => {
      if (product.productname == data.productname) {
        if (product.quantity >= 2) {
          product.quantity -= 1;
        }
      }
      return product;
    });
    setproducts(selectedproductdetails);
  }
  const changeevent = (event) => {
    setcustomerdata({ ...customerdata, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <div className="pageheading">
        Add New Customer
      </div>
      <form className="formcontainer">
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Select Owner:
            </div>
            <div className="formdatainputstyle">
              <CustomizedComboboxForOwner
                comboboxdata={owner}
                // type="state"
                selectevent={selecteventforowner}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Customer Name:
            </div>
            <div className="formdatainputstyle">
              <input
                name="customer_name"
                type="text"
                onChange={changeevent}
              />
              <p className="errormsgstyle">{errors.customerNameError}</p>
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Customer Address:
            </div>
            <div className="formdatainputstyle">
              <input
                name="customer_address"
                type="text"
                onChange={changeevent}
              />
              <p className="errormsgstyle">{errors.customerAddressError}</p>
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            {/* <sup className="asteriskstyle">*</sup> */}
            State:
            </div>
            <div className="formdatainputstyle">
              <CustomizedComboboxForState
                selectedowner={selectedowner}
                comboboxdata={state}
                // type="state"
                selectevent={selecteventforstate}
              />
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
            <sup className="asteriskstyle">*</sup>Ph no:
            </div>
            <div className="formdatainputstyle">
              <input
                name="phone_number"
                type="number"
                onChange={changeevent}
                onWheel={(e) => e.target.blur()}
              />
              <p className="errormsgstyle">{errors.phoneNumberError}</p>
            </div>
          </label>
        </div>
        <div className="nameandinputcontainer">
          <label className="formdatalabelstyle">
            <div className="formnamestyle">
              Ph no (Alter - 1):
            </div>
            <div className="formdatainputstyle">
              <input
                name="phone_number_alter_one"
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
              Ph no (Alter - 2):
            </div>
            <div className="formdatainputstyle">
              <input
                name="phone_number_alter_two"
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
            <sup className="asteriskstyle">*</sup>Enquired Product:
            </div>
            <div className="formdatainputstyle">
              <CustomizedComboboxMultipleSelect
                comboboxdata={comboboxdata}
                selectedproducts={selectedproducts}
              />
              <p className="errormsgstyle">{errors.enquiredProductError}</p>
            </div>
          </label>
        </div>
        <div>
          <div className="selectedproductheading">Selected products:-
            <ul>
              {products && products.length &&
                products.map((data, i) => (
                  <li key={i} className="productnamedesign">
                    <div>{data.productname}</div>
                    <div className="incrementdecrement">
                      <CustomizedBtn BtnName="+" onClick={() => { incrementclicked(data) }} />
                      {data.quantity}
                      <CustomizedBtn BtnName="-" onClick={() => { decrementclicked(data) }} />
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
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
export default AddFewCustomersForm;